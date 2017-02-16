
var ClearLayer = cc.Layer.extend({
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
                result.setPosition(size.width / 2, size.height /5.5);
                result.setScale(0.3);
                this.addChild(result, 1);

                var poke = cc.Sprite.create(res.zukan);
                poke.setPosition(size.width / 2, size.height /1.8);
                poke.setScale(1);
                this.addChild(poke, 1);

                var bg = cc.Sprite.create(res.gara);
                bg.setPosition(size.width / 2, size.height /2);
                bg.setScale(1);
                this.addChild(bg, 0);

                var color = cc.color(0,0,0,128);
                var moji = cc.LabelTTF.create("やったー！", "Arial", 16);
                moji.setPosition(size.width / 2.8, size.height / 5);
                moji.setColor(color);
                this.addChild(moji, 2);

                var moji1 = cc.LabelTTF.create("ポケモンを つかまえたぞ！", "Arial", 16);
                moji1.setPosition(size.width / 2, size.height / 6.5);
                moji1.setColor(color);
                this.addChild(moji1, 2);

                var moji2 = cc.LabelTTF.create("STAGE CLEAR!", "Arial", 26);
                moji2.setPosition(size.width / 2, size.height / 1.1);
                this.addChild(moji2, 2);

                score_label = cc.LabelTTF.create("score:" + bonus, "Arial",25);
                score_label.setPosition(cc.p(size.width / 2, size.height / 15));
                score_label.setScale(1);
                this.addChild(score_label);
/*
                var replay = cc.Sprite.create(res.replay_button_pressed_png);
                replay.setPosition(size.width / 2, size.height /3.3);
                replay.setScale(1.3);
                this.addChild(replay, 0);
*/

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
        cc.director.runScene(new SelectScene());
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
    },
});

var ClearScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var clear = new ClearLayer();
        this.addChild(clear);
    }
});
