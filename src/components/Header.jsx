import React from "react"
import "../styles/header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="hd">
        <div className="inner">
          <a href="/" className="logo">
            <img src="main_logo_spring.svg"></img>
          </a>
          <div className="gnb">
            <a><span>구역검색</span></a>
            <a><span>조합찾기</span></a>
          </div>
          <ul className="menu">
            <li className="signin">
              <button>로그인</button>
            </li>
            <li className="signup">
              <button>회원가입</button>
            </li>
            <li className="cs">
              <button>고객센터</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}