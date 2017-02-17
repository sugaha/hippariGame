
var TitleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.title_wav, true);
        }

/*
                var OverBG = cc.Sprite.create(res.GOBG_png);
                OverBG.setPosition(size.width / 2, size.height /3.3);
                OverBG.setScale(1.3);
                this.addChild(OverBG, 0);

*/
                var logo = cc.Sprite.create(res.logo);
                logo.setPosition(size.width / 2.1, size.height /1.7);
                logo.setScale(1);
                this.addChild(logo, 1);

                var result = cc.Sprite.create(res.wind);
                result.setPosition(size.width / 2, size.height /5.5);
                result.setScale(0.3);
                this.addChild(result, 1);

                var result = cc.Sprite.create(res.haikei);
                result.setPosition(size.width / 2, size.height /2);
                result.setScale(1);
                this.addChild(result, 0);

                var color = cc.color(0,0,0,128);
                var moji = cc.LabelTTF.create("クリック　で　すすむ", "Arial", 16);
                moji.setPosition(size.width / 2, size.height / 5);
                moji.runAction(cc.repeatForever(cc.Blink.create(2.5,1)));
                moji.setColor(color);
                this.addChild(moji, 1);
/*
                var moji2 = cc.LabelTTF.create("Pokemon GO", "Arial", 26);
                moji2.setPosition(size.width / 2, size.height / 1.8);
                this.addChild(moji2, 1);

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
        //cc.director.runScene(new SelectScene());
        nextScene = cc.TransitionFade.create(2, new SelectScene());
        audioEngine.playEffect(res.kettei);
        cc.director.runScene(nextScene)
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
    },
});

var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var title = new TitleLayer();
        this.addChild(title);
    }
});
