# View PDF Table

PDFの表を切り出してフィルタブルなHTMLにする。  
ビルドしてGitHub Pagesで公開する。(docs配下)

## 用途

アレルギー表示とかPDF形式が多い  
でも検索がめんどくさい  
だからこのシステムでフィルタできるようにする。  
うまく表示できないPDFがあったら、IssuesでURLと一緒に報告してください。暇なら対応する。

## 免責

- **重要な情報は、必ず原本で確認すること。** こちらで検索してPDFで確認のように。完全に正しくテーブル化することは不可能です。それで問題が出ても責任取れません。
- PDFに表が2つ以上あると、最初の方しかうまくできないと思う。

## 開発

### build

```
npm run build
```

### update GitHub Page

```
npm run updatePage
```

