document.addEventListener('DOMContentLoaded', function () {
    // URLSearchParamsを使ってURLパラメータを解析
    const urlParams = new URLSearchParams(window.location.search);

    // パラメータを取得
    const keyParam = urlParams.get('key');
    const startParam = urlParams.get('start');
    const endParam = urlParams.get('end');
    const breakParam = urlParams.get('break');
    const lateNightBreakParam = urlParams.get('late_night_break');
    const nameParam = urlParams.get('name'); // 新しいパラメータ

    // エラーメッセージを保持する変数
    let errorMessage = '';

    // 今日と昨日の日付を取得
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 日付をyyyyMMdd形式に変換する関数
    function formatDate(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}${month}${day}`;
    }

    // 今日と昨日のyyyyMMdd形式の日付
    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    // 複数のエラーチェックを行う
    if (!keyParam || !startParam || !endParam || !breakParam || !lateNightBreakParam || !nameParam) {
        errorMessage = 'すべてのパラメータが揃っていません。';
    } else {
        // keyパラメータの先頭8桁を取得
        const datePart = keyParam.slice(0, 8);
        if (datePart !== todayStr && datePart !== yesterdayStr) {
            errorMessage = '勤怠報告期日が超えています。';
        }
    }

    // エラーメッセージが設定されている場合、エラーページにリダイレクト
    if (errorMessage) {
        window.location.href = `error.html?message=${encodeURIComponent(errorMessage)}`;
    } else {
        // 入力フォームを表示
        document.getElementById('input-form').style.display = 'block';

        // input要素にkeyParamとstartParamを設定
        document.getElementById('key').value = keyParam;
        document.getElementById('start').value = startParam;
        document.getElementById('end').value = endParam;
        document.getElementById('break').value = breakParam;
        document.getElementById('late-night-break').value = lateNightBreakParam;

        // 名前パラメータを表示
        const nameDisplay = document.getElementById('name-display');
        if (nameParam) {
            nameDisplay.innerText = nameParam + 'さん';
        } else {
            nameDisplay.innerText = 'ゲストさん';
        }

        // ここでKeyの先頭8桁を取得して表示
        const keyValue = document.getElementById('key').value; // 例: "20230701XXXX"
        if (keyValue.length >= 8) {
            const year = keyValue.substring(0, 4);
            const month = keyValue.substring(4, 6);
            const day = keyValue.substring(6, 8);
            const date = new Date(`${year}-${month}-${day}`);
            const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
            const formattedDate = `就業日 ${year}年${parseInt(month)}月${parseInt(day)}日 (${dayOfWeek})`; // 日付の表示
            document.getElementById('work-date').innerText = formattedDate;
        }
    }

    // フォーム送信関数を追加
    window.validateForm = function () {
        // エラーメッセージをリセット
        let isValid = true;
        const inputs = ['start', 'end', 'break', 'late-night-break'];

        inputs.forEach(function (id) {
            const input = document.getElementById(id);
            const errorElement = document.getElementById(`${id}-error`);
            const value = input.value.padStart(4, '0'); // 先頭にゼロを追加して4桁にする
            
            // 初期状態ではエラーメッセージを非表示
            errorElement.style.display = 'none';
            
            // バリデーションチェック
            if (!/^[0-2][0-9][0-5][0-9]$/.test(value) || value < '0000' || value > '2359') {
                errorElement.style.display = 'block';
                isValid = false;
            }
        });

        if (isValid) {
            // フォームを送信
            document.getElementById('myForm').submit();

            // フォームを非表示にして感謝メッセージを表示
            document.getElementById('formWrapper').style.display = 'none';
            document.getElementById('thxMessage').style.display = 'block';

            // 現在の時間を取得してメッセージを表示
            const now = new Date();
            const nowHour = now.getHours();
            const nowMinutes = now.getMinutes();
            const nowTime = `${nowHour}時${nowMinutes}分に出発報告を承りました。`;
            document.getElementById("time").innerHTML = nowTime;
        }
        return false; // フォーム送信を中断
    }
});
