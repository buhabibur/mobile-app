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
        let w_confirm = window.confirm("LocalStorageに\n 「" + key + " " + value + "」\n を保存しますか?");
        //確認（かくにん）ダイアログで「OK」を押されたとき、すべて削除（さくじょ）する
        if (w_confirm === true) {
          localStorage.setItem(key, value);
          viewStorage();
          let w_msg = "LocalStorage: " + key + " : " + value + " を保存しました。";
          window.alert(w_msg);

          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
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
      const chkbox1 = document.getElementsByName("chkbox1");
      const table1 = document.getElementById("table1");
      let w_cnt = 0; //選択されているデータの数　w_sel = selectCheckBox（）；//デーブルからデータ選択（せんたく）
      w_cnt = selectCheckBox("del");

      if (w_cnt >= 1) {
        //const key = document.getElementById("textKey").value;
        //const value = document.getElementById("textMemo").value;
        let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか？");
        //確認（かくにん）ダイアログで「OK」を押されたとき、すべて削除（さくじょ）する
        if (w_confirm === true) {
          for (let i = 0; i < chkbox1.length; i++){
            if (chkbox1[i].checked) {
              localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
            }
          }
          viewStorage();   //localstorageからのデータ取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageから" + w_cnt + "件を削除（さくじょ）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    }, false
  );
};

// 4.1ocalStorageからすべて削除（さくじょ）
function allClearlocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
    function (e) {
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
      selectCheckBox("select");
    }, false
  );
};

//テーブルからデータ選択（せんたく）
function selectCheckBox(mode) {
  //let w_sel = "0";//選択（せんたく）されていれば、1”にする
  let w_cnt = 0;
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";
  let w_textMemo = "";

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
        //return w_sel = "1";
      }
      w_cnt++;
    }
  }
  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;
  if (mode === "select") {
    if (w_cnt === 1) {
      return w_cnt;
    } else {
      window.alert("一つ選択 (select) してください");
    }
  }

  if (mode === "del") {
    if (w_cnt >= 1) {
      return w_cnt;
    }
    else {
      window.alert("一つ以上選択 (select) してください");
    }
  }
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
    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }
  // jQueryのplugin tablesorterを使ってテ
  // sortList：引数1...最初からソートしておく列を指定、引2...0.、1降順
  $("#table1").tablesorter({      //tablesort add
    sortList: [[1, 0]]            //tablesort add
  });                             //tablesort add

  $("#table1").trigger("update"); //tablesort add
}
