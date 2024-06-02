import { Link } from 'react-router-dom'

import './sitemap.scss';

const SiteMap = () => (
  <div className="sitemap">
    <br /><br />
    <h2>Карта сайта</h2>
    <nav>
      <ul>
        <li><Link to='/'>Главная</Link></li>
        <li><Link to='/about'>О приложении</Link></li>
        <li><Link to='/shorts'>Смотреть видео</Link></li>
        <li><Link to='/profile'>Мой профиль</Link></li>
        <li><Link to='/user-shorts'>Мои видео</Link></li>
        <li><Link to='/new-short'>Новое видео</Link></li>
        <li><Link to='/nft-short'>Cменить владельца NFT</Link></li>
      </ul>
    </nav>
  </div>
)

export default SiteMap