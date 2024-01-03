/*
 * @Date: 2024-01-02 21:39:57
 */
import { ChangeEvent, FC } from "react";
import { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  // background: var(--header-background);
  background: #282c34;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 20px;
  .left {
    flex-shrink: 0;

    h1 {
      // color: var(--header-logo-color);
      color: #9da5b4;
    }
  }
  .center {
    flex-grow: 1;
    height: 100%;

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      text-align: center;
      // color: var(--header-btn-color);
      color: #9da5b4;
      font-size: 18px;
    }
  }
  .right {
    display: flex;
    flex-shrink: 0;

    .dropdownBtn {
      position: relative;

      .btn {
        .icon {
          margin-right: 0;
        }
      }
    }
    .btn {
      // background: var(--header-btn-background);
      background:none;
      // border: 1px solid var(--header-btn-border-color);
      border: 1px solid #9da5b4;
      color: var(--header-btn-color);
      min-width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 16px;
      margin: 0 10px 0 0;
      position: relative;
      border-radius: 4px;
      text-overflow: ellipsis;
      text-decoration: none !important;
      font-weight: 400 !important;
      cursor: pointer;
      transition: all 0.3s;
      opacity: 0.7;
      user-select: none;

      &:hover {
        opacity: 1;
      }

      &:active {
        transform: translateY(1px);
      }

      .icon {
        margin-right: 5px;
      }
    }
  }
`;

const Header = () => {
  const [codeTitle, setCodeTitle] = useState("");
  const onCodeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeTitle(e.target.value);
  };

  const openSetting = () => {
    console.log("openSetting");
  };
  return (
    <>
      <HeaderContainer>
        <div className="left">
          <h1>CodeRun</h1>
        </div>
        <div className="center">
          <input type="text" value={codeTitle} onInput={onCodeTitleInput} />
        </div>
        <div className="right">
          <div className="btn" onClick={openSetting}>
            <span className="icon iconfont icon-setting"></span> 设置
          </div>
        </div>
      </HeaderContainer>
    </>
  );
};
export default Header;
