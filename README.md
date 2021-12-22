# 使い方&インストールガイド

## インストールガイド

### 開発環境編
AWS提供のCloud9を用いる
```Terminal
# バージョンを指定してRailsをインストールする
$ gem install rails -v 6.0.3

# bundlerのバージョンを指定してインストールする
$ gem install bundler -v 2.2.17

# Cloud9環境のディスク容量アップと、クラウドIDEへのYarnインストール
$ source <(curl -sL https://cdn.learnenough.com/resize)
$ source <(curl -sL https://cdn.learnenough.com/yarn_install)
$ yarn install --check-files

# 必要なRubyGemsをインストール
$ bundle install --without production

## node関係でトラブルが発生した場合
$ rm -rf node_modules/
$ rm -rf yarn.lock
$ yarn install

# サーバー起動
$ rails s
```

### 本番環境編
HEROKUへのデプロイ

```Terminal
# 本番用以外のgemをインストールする
$ bundle _2.2.17_ config set --local without 'production'
$ bundle _2.2.17_ install

# HEROKUのインストール
$ source <(curl -sL https://cdn.learnenough.com/heroku_install)

$ heroku login --interactive
$ heroku create
$ git push heroku master
```

## 使い方ガイド
基本の使い方
1. Twitterの検索キーワードまたはYouTubeの配信URLを貼り付ける
2. GENERATEをクリック
3. SCREENページを開く
4. SCREENページをOBSのブラウザソースで取り込む

オプション
- FONT SIZE => 生成するコメントのフォントサイズを設定する
- OPACITY => 生成するコメントの透明度を設定する
- NICOINCO MODE => ニコニコ動画のようにコメントを出力する
- YOUTUBE MODE => YouTubeの配信のようにコメントを出力する
```
オプションを変更したら左下の「Update Settings」をクリックして反映
```