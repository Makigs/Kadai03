# Kadai03
Local storage 

<h3>①課題内容（どんな作品か）</h3>
・お口の健康シミュレーションのWebアプリです。<br>
・卒業制作(仮)で提出したサイトのフロントサイドを作成してみました。<br>
・AI画像診断と記載していますが、今は実装できてません（卒業制作予定）<br>


<h3>②工夫した点・こだわった点</h3>
・年齢や歯磨きの頻度などの情報を入力し、その情報をローカルストレージに格納しています(5秒に一回)<br>
・5秒に一度Input内容をチェックする仕様としていて、内容をローカルストレージに格納します。意図せぬリロードなどが発生した際、ローカルストレージにでーたがあればそれを反映できるようにしています。
・シミュレーション結果ページでは、ローカルストレージに格納したデータを用いて、IF文などを使い結果を表示させています。<br>
・必須項目をすべて選択したらボタンがクリックできる機能を入れましたが、リロード後ローカルストレージから値をとってくる際にボタン状態を正しく反映できるようにした点。<br>
・フレキシブルレイアウトに調整しました。<br>

<h3>③難しかった点・次回トライしたいこと(又は機能)</h3>
・6/2　2:30時点で、CSSについてはスマホ用ページしか完成しておりません。（760px以上で見ると崩れます）<br>
　PC用ページについては、いったん提出後、土曜日までに仕上げます。<br>
　6/2　18：00時点で、上記修正いたしました。<br>

・画像をLocal storageに格納した際、ファイル名も同じく格納して利用したかったのですが、セキュリティ上の問題でエラーとなり実装ができませんでした。<br>


<h3>④質問・疑問・感想、シェアしたいtips等なんでも</h3>
[感想]今週はあまり時間が取れず、かなりきつかったです。来週は余裕をもって進められるよう頑張ります。
