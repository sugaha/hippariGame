//var leftBtn; //左ボタン
//var rightBtn; //右ボタン
//var centBtn;//中ボタン
//var key_seigyo = false;
var SelectLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          //audioEngine.playMusic(res.umi2_mp3, true);
        }

/*
                var OverBG = cc.Sprite.create(res.GOBG_png);
                OverBG.setPosition(size.width / 2, size.height /3.3);
                OverBG.setScale(1.3);
                this.addChild(OverBG, 0);
*/
                var result = cc.Sprite.create(res.wind);
                result.setPosition(size.width / 2, size.height /12);
                result.setScale(0.3);
                this.addChild(result, 2);

                var select1 = cc.Sprite.create(res.waku2);
                select1.setPosition(size.width / 6, size.height /4.9);
                select1.setScale(0.6);
                this.addChild(select1, 2);

                var select2 = cc.Sprite.create(res.waku2);
                select2.setPosition(size.width / 2, size.height /4.9);
                select2.setScale(0.6);
                this.addChild(select2, 2);

                var select3 = cc.Sprite.create(res.waku2);
                select3.setPosition(size.width / 1.2, size.height /4.9);
                select3.setScale(0.6);
                this.addChild(select3, 2);

                var icon1 = cc.Sprite.create(res.icon1);
                icon1.setPosition(size.width / 12, size.height /1.42);
                icon1.setScale(1.5);
                this.addChild(icon1, 2);

                var icon2 = cc.Sprite.create(res.icon2);
                icon2.setPosition(size.width / 1.8, size.height /2.5);
                icon2.setScale(1.5);
                this.addChild(icon2, 2);

                var icon3 = cc.Sprite.create(res.icon3);
                icon3.setPosition(size.width / 1.7, size.height /1.1);
                icon3.setScale(1.5);
                this.addChild(icon3, 2);

                var map = cc.Sprite.create(res.map);
                map.setPosition(size.width / 2.2, size.height /1.65);
                map.setScale(0.65);
                this.addChild(map, 1);

                var bg = cc.Sprite.create(res.gara);
                bg.setPosition(size.width / 2, size.height /3);
                bg.setScale(1);
                this.addChild(bg, 0);

                var color = cc.color(0,0,0,128);
                var moji = cc.LabelTTF.create("ステージを　せんたくしてください", "Arial", 16);
                moji.setPosition(size.width / 2, size.height / 11);
                moji.setColor(color);
                this.addChild(moji, 2);

                var moji1 = cc.LabelTTF.create("a:トキワのもり", "Arial", 16);
                moji1.setPosition(size.width / 6, size.height / 4.9);
                moji1.setColor(color);
                this.addChild(moji1, 2);

                var moji2 = cc.LabelTTF.create("b:セキチクシティ", "Arial", 16);
                moji2.setPosition(size.width / 2, size.height / 4.9);
                moji2.setColor(color);
                this.addChild(moji2, 2);

                var moji3 = cc.LabelTTF.create("c:ハナダシティ", "Arial", 16);
                moji3.setPosition(size.width / 1.2, size.height / 4.9);
                moji3.setColor(color);
                this.addChild(moji3, 2);


/*
                var replay = cc.Sprite.create(res.replay_button_pressed_png);
                replay.setPosition(size.width / 2, size.height /3.3);
                replay.setScale(1.3);
                this.addChild(replay, 0);
*/

        //キーボードリスナーの実装
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

            if (keyCode == 65)  // a-Keyで左に移動
                idou();
            },

        },this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

            if (keyCode == 66)  // b-Keyで左に移動
                idou2();
            }

        },this);

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new gameScene());
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
    },
});




function idou(){
  cc.director.runScene(new gameScene());
}

function idou2(){
  cc.director.runScene(new gameScene2());
}

var SelectScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var select = new SelectLayer();
        this.addChild(select);
    }
});
