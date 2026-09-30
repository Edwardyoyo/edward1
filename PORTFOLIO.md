![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中打造的純前端待辦清單應用程式。使用者可以新增、完成、刪除及篩選待辦，資料會保存在瀏覽器中。

## 線上展示

`https://<你的帳號>.github.io/<你的repo名稱>/`

## 功能

- 新增待辦事項，空白內容不會加入清單。
- 勾選完成或取消完成；已完成項目會顯示刪除線並淡化。
- 刪除待辦事項。
- 顯示整份清單的未完成數量。
- 使用 `localStorage` 保存待辦，重新整理後仍可讀取。
- 清單或篩選結果為空時顯示相應提示；已完成篩選下取消勾選時，提示項目仍保留在「全部」清單。
- 透過「全部／未完成／已完成」篩選待辦事項。
- 置中卡片版面，支援手機螢幕。

> 目前版本尚未包含深色模式切換。

## 技術

使用純 HTML、CSS 與原生 JavaScript，沒有前端框架或套件。色彩以 CSS 自訂屬性管理，待辦資料使用瀏覽器 `localStorage` 儲存。

## 開發方式

專案以 GitHub Copilot Agent Mode 協作開發及驗證。`.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP Server；`.github/copilot-instructions.md` 記錄專案規範；`.github/prompts/fix-issue.prompt.md` 定義可重複使用的 issue 處理流程，包含讀取 issue、提出計畫、等待確認、修正、驗證與建立 PR。

## 我學到什麼

- 把需求寫清楚，有助於讓 Agent 跨檔案完成一致的修改。
- 篩選是顯示條件，不代表資料遭到刪除；介面應清楚說明空結果。
- 用瀏覽器重現 issue，並檢查重新載入後的資料，能驗證行為是否正確。
- MCP 可連結外部文件與 GitHub；instructions 和 prompt 可讓協作規則與重複流程留在 repo 中。
