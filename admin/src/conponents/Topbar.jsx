import React from 'react'
import './css/topbar.css'
import { Language, NotificationsNone, Settings } from '@mui/icons-material'

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Mustad Maroc</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://www.mustad.com/sites/mustad.com/files/logo/Mustad%E2%80%94logo.svg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}

export default Topbar
