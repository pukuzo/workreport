// URLSearchParamsを使ってURLパラメータを解析
const urlParams = new URLSearchParams(window.location.search);

// パラメータを表示する要素を取得
const paramsDiv = document.getElementById('params');

// パラメータが存在するか確認
if (urlParams.toString()) {
    // パラメータを表示するためのリストを作成
    const paramList = document.createElement('ul');
    
    // 各パラメータをリストアイテムとして追加
    urlParams.forEach((value, key) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        paramList.appendChild(listItem);
    });
    
    // リストをdivに追加
    paramsDiv.appendChild(paramList);
} else {
    // パラメータがない場合のメッセージを表示
    paramsDiv.textContent = 'URLにパラメータがありません。';
}
