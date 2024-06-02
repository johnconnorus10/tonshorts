package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
)

var (
	bot *tgbotapi.BotAPI
	dir string
	token string
)

var compatibleFormats = []string{".mp4", ".mov", ".avi", ".mkv", ".webm"}

func isCompatible(filename string) bool {
	// проверяем разрешения файлов. для обработки ffmpeg
	var compatible = false
	lowercaseFilePath := strings.ToLower(filename)
	for _, format := range compatibleFormats {
		if strings.HasSuffix(lowercaseFilePath, format) {
			compatible = true
			break
		}
	}
	return compatible
}

func sendMessage(chatID int64, text string) {
	go func() {
		msg := tgbotapi.NewMessage(chatID, text)
		_, err := bot.Send(msg)
		if err != nil {
			fmt.Printf("Ошибка отправки сообщения: %v\n", err)
		}
	}()
}

func downloadFile(fileID, filePath string) error {
	fileConfig := tgbotapi.FileConfig{
		FileID: fileID,
	}

	file, err := bot.GetFile(fileConfig)
	if err != nil {
		return fmt.Errorf("Ошибка получения файла: %v", err)
	}

	resp, err := http.Get(file.Link(bot.Token))
	if err != nil {
		return fmt.Errorf("Ошибка загрузки видео: %v", err)
	}
	defer resp.Body.Close()

	output, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("Ошибка создания видео файла: %v", err)
	}
	defer output.Close()

	_, err = io.Copy(output, resp.Body)
	if err != nil {
		return fmt.Errorf("Ошибка сохранения файла: %v", err)
	}

	return nil
}

func convertVideo(inputFile string) (string, error) {
	// проверка установлено ли дополнение ffmpeg
	_, err := exec.LookPath("ffmpeg")
	if err != nil {
		return "", fmt.Errorf("ffmpeg не установлен")
	}

	// Check if the input file exists
	if _, err := os.Stat(inputFile); os.IsNotExist(err) {
		return "", fmt.Errorf("исходное видео не найдено")
	}

	// Получить расширение и имя загруженного файла
	filename := filepath.Base(inputFile)
	extension := filepath.Ext(filename)
	filenameWithoutExt := filename[:len(filename)-len(extension)]

	// создаем название файла результата конвертации
	outputFile := filepath.Join(".", filenameWithoutExt+".webm")

	// получаем размер файла
	dimensions, err := getVideoDimensions(inputFile)
	if err != nil {
		return "", fmt.Errorf("Ошибка получения размера видео: %v", err)
	}

	// Calculate the new dimensions based on the longer side being 512 pixels
	newWidth, newHeight := calculateDimensions(dimensions)

	// конвертация видео, с помощью ffmpeg
	cmd := exec.Command("ffmpeg",
		"-y",            // Overwrite output file if it exists
		"-i", inputFile, // Input file
		"-vf", fmt.Sprintf("scale=%d:%d", newWidth, newHeight), // Resize with calculated dimensions
		"-c:v", "libvpx-vp9", // VP9 video codec
		//"-an",      // No audio stream
		"-r", "30", // Set frame rate to 30 FPS
		"-t", "60", // Limit duration to 60 seconds
		"-loop", "0", // Loop the video
		"-s", fmt.Sprintf("%dx%d", newWidth, newHeight), // Output size with new dimensions
		"-crf", "48", // Control output video quality (lower value means higher quality)
		"-b:v", "256k", // Set maximum output bitrate to 256 Kbps
		outputFile,
	)

	err = cmd.Run()
	if err != nil {
		return "", fmt.Errorf("Ошибка конверации видео: %v", err)
	}

	return outputFile, nil
}

func getVideoDimensions(inputFile string) (dimensions string, err error) {
	// получаем информацию о видео, с помощью ffprobe
	cmd := exec.Command("ffprobe",
		"-v", "error",
		"-select_streams", "v:0",
		"-show_entries", "stream=width,height",
		"-of", "csv=s=x:p=0",
		inputFile,
	)

	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("Ошибка получения размера видео: %v", err)
	}

	dimensions = string(output)
	return dimensions, nil
}

func calculateDimensions(dimensions string) (newWidth, newHeight int) {
	
	var dmax int = 1024
	
	var width, height int
	_, err := fmt.Sscanf(dimensions, "%dx%d", &width, &height)
	if err != nil {
		return width, height
	}

	if width > height {
		// Landscape orientation
		newWidth = dmax
		newHeight = height * dmax / width
	} else {
		// Portrait or square orientation
		newWidth = width * dmax / height
		newHeight = dmax
	}

	return newWidth, newHeight
}

func main() {
	// получение текущей директории на сервере
	exePath, err := os.Executable()
	if err != nil {
		fmt.Print("Не могу получить корневую папку:", err)
		os.Exit(1)
	}

	dir = filepath.Dir(exePath)

	token = os.Getenv("BOT_TOKEN") //токен из файла .env

	// инициализация Телеграм бота
	bot, err = tgbotapi.NewBotAPI(token)
	if err != nil {
		fmt.Printf("Ошибка инициализации Телеграм бота: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Бот запущен!")

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates, err := bot.GetUpdatesChan(u)
	if err != nil {
		fmt.Printf("Ошибка подключения к каналу: %v\n", err)
		os.Exit(1)
	}

	for update := range updates {
		if update.Message == nil {
			continue
		}

		// обработка команды "/start"
		if update.Message.IsCommand() && update.Message.Command() == "start" {
			msg := tgbotapi.NewMessage(update.Message.Chat.ID, "TON Shorts bot. Отправьте короткое видео до 50 бм, далее скопируйте ссылку в web3 приложение. \n")
			// отправка приветственно сообщения с кнопкой
			msg.ReplyMarkup = tgbotapi.NewInlineKeyboardMarkup(
				tgbotapi.NewInlineKeyboardRow(
					tgbotapi.NewInlineKeyboardButtonURL("Узнайте о выходе проекта в MAINNET TON на сайте tonshorts.ru", "https://tonshorts.ru"),
				),
			)
			bot.Send(msg)
		}	

		// обработка загрузки видео файла
		if update.Message.Document != nil || update.Message.Video != nil {
			var fileID = ""
			var filePath = ""
			if update.Message.Document != nil {
				fileID = update.Message.Document.FileID
				filename := update.Message.Document.FileName
				if strings.LastIndex(filename, ".") == -1 {
					filePath = fmt.Sprintf("%s.mp4", fileID)
				} else {
					filePath = fmt.Sprintf("%s.%s", fileID, filename[strings.LastIndex(filename, ".")+1:])
				}

			} else if update.Message.Video != nil {
				fileID = update.Message.Video.FileID
				filePath = fmt.Sprintf("%s.mp4", update.Message.Video.FileID)
			}

			// проверка поддерживается ли формат видео для работы с ffmpeg
			var compatible = isCompatible(filePath)
			if !compatible {
				sendMessage(update.Message.Chat.ID, "Формат файла не поддерживается!")
				continue
			}

			sendMessage(update.Message.Chat.ID, "Конвертирую видео ...")

			// скачивание присланного боту видео
			joinedFilePath := filepath.Join(dir, filePath)
			err := downloadFile(fileID, joinedFilePath)
			if err != nil {
				sendMessage(update.Message.Chat.ID, "Не могу загрузить ваше видео.")
				fmt.Printf("Не могу загрузить ваше видео: %v\n", err)
				continue
			}

			// конвертация видео
			convertedFilePath, err := convertVideo(joinedFilePath)
			if err != nil {
				sendMessage(update.Message.Chat.ID, "Ошибка конверации видео.")
				fmt.Printf("Ошибка конверации видео: %v\n", err)
				os.Remove(joinedFilePath)
				os.Remove(convertedFilePath)
				continue
			}
			sendMessage(update.Message.Chat.ID, "Видео сконвертировано. Отправляю вам...")
			// отправка сконвертированного видео в чат
			video := tgbotapi.NewVideoUpload(update.Message.Chat.ID, convertedFilePath)
			bot.Send(video)
			os.Remove(joinedFilePath)
			os.Remove(convertedFilePath)

		} else if update.Message.Text == "" {
			sendMessage(update.Message.Chat.ID, "Не обнаружил видео в вашем сообщении. \nПопробуйте прислать что-нибудь другое ...")
			fmt.Printf("Не обнаружил видео в вашем сообщении. debug update.Message: %+v\n", update.Message)
		}
	}//for
}
