import { useEffect, useState, useCallback  } from "react";

import axios from "axios";

export function useUserBalance(addr) {

    const [points, setPoints] = useState(0);

    const getData = useCallback(async() => {
        const result = await axios(
            `https://asqi.ru/points.php?addr=`+addr,
          );
    
        setPoints(result.data);
    }, [addr]);


    useEffect(()=>{

        getData();

    }, [getData])

    return {
        points,
        updatePoints: () => {
            getData();

        }
    }
}