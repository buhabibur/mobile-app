"use strict";

// 1. ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener(
  "DOMContentLoaded",
  function () {
    // 1. localStorage が使えるか確認
    if (typeof localStorage === "undefined") {
      window.alert("このブラウザは localStorage 機能が実装されていません");
      return;
    } else {
      viewStorage();
      saveLocalStorage(); // 2. localStorage への保存
      deLocalStorage();
      allClearlocalStorage();
      selectTable();
    }
  },
  false
);

// 2. localStorage への保存
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      // 値の入力チェック
      if (key === "" || value === "") {
        window.alert("Key、Memo はいずれも必須です。");
        return;
      } else {
        localStorage.setItem(key, value);
        viewStorage();
        let w_msg = "LocalStorage: " + key + " : " + value + " を保存しました。";
        window.alert(w_msg);

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    },
    false
  );
};

//localstorageから1件削除（さくじょ）
function deLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click",
    function (e) {
      e.preventDefault();
      let w_sel = "0";//選択（せんたく）されていれば、”1”が返却（へんきゃく）されるw_sel = selectRadioBtn（）；//デーブルからデータ選択（せんたく）
      w_sel = selectRadioBtn();

      if (w_sel === "1") {
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;
        localStorage.removeItem(key);
        viewStorage();   //localstorageからのデータ取得（しゅとく）とテーブルへ表示（ひょうじ）
        let w_msg = "LocalStorageから" + key + " " + value + "を削除（さくじょ）しました。";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    }, false
  );
};

// 4.1ocalStorageからすべて削除（さくじょ）
function allClearlocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
    function(e) {
      e.preventDefault();
      let w_confirm = window.confirm("Localstorageのデータをすべて削除(all clear)します。\nよろしいですか?");
      //確認（かくにん）ダイアログで「OK」を押されたとき、すべて削除（さくじょ）する
      if (w_confirm === true) {
        localStorage.clear();
        viewStorage();//localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
        let w_msg = "Localstorageのデータをすべて削除(all clear)しました。";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    }, false
  );
};


function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",
    function (e) {
      e.preventDefault();
      selectRadioBtn();
    }, false
  );
};

//テーブルからデータ選択（せんたく）
function selectRadioBtn() {
  let w_sel = "0";//選択（せんたく）されていれば、1”にする
  const radio1 = document.getElementsByName("radio1");
  const table1 = document.getElementById("table1");

  for (let i = 0; i < radio1.length; i++) {
    if (radio1[i].checked) {
      document.getElementById("textKey").value = table1.rows[i + 1].cells[1].firstChild.data;
      document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
      return w_sel = "1";
    }
  }
  window.alert("一つ選択 (select) してください");
};

// localStorageからデータを取得してテーブルへ表示
function viewStorage() {
  const list = document.getElementById("list");

  // HTMLテーブル初期化
  while (list.rows[0]) list.deleteRow(0);

  // localStorageすべての情報を取得
  for (let i = 0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    // 表示する行を作成
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    // ラジオボタン / キー / 値 を表示
    td1.innerHTML = "<input name='radio1' type='radio'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }
}
