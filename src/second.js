var world;
var shapeArray=[];
var startTouch;
var endTouch;
var touching = false;
var shape;
var dX=0;
var dY=0;
var dZ=0;
var zanki;
var miss=5;
var bonus=9999;

var cocos_box;
var arrow_node;
var arrow_line;
var debug_label1;
var debug_label2;
if (typeof SpriteTag == "undefined") {
   var SpriteTag = {};
   SpriteTag.totem = 0; // トーテム
   SpriteTag.destroyable = 1; //障害物
   SpriteTag.solid = 2; //台座
   SpriteTag.ground = 3; //地面
   SpriteTag.target = 4; //ターゲット
   SpriteTag.out = 5; //ゲームオーバーチェック

};
var gameLayer2;
var gameScene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer2 = new game2();
        gameLayer2.init();
        this.addChild(gameLayer2,1);
        var size = cc.director.getWinSize();

        var BG =
              cc.Sprite.create(res.haikei2);
              BG.setPosition(size.width / 2, size.height /2);
              BG.setScale(1);
              this.addChild(BG, 0);
/*
      debug_label1 = cc.LabelTTF.create("クリックして", "Arial", 26);
      debug_label1.setPosition(size.width / 2, size.height * 0.7);
      this.addChild(debug_label1, 1);
      debug_label2 = cc.LabelTTF.create("引っ張って下さい", "Arial", 26);
      debug_label2.setPosition(size.width / 2, size.height * 0.6);
      this.addChild(debug_label2, 1);*/
      label1 = cc.Sprite.create(res.lv2);
       label1.setPosition(size.width / 7, size.height * 0.93);
       this.addChild(label1, 1);
       label2 = cc.LabelTTF.create("ボーナス : 9999", "Arial", 20);
       label2.setPosition(size.width / 1.8, size.height * 0.93);
       this.addChild(label2, 1);
       label3 = cc.Sprite.create(res.ballB);
       label3.setPosition(size.width / 1.21, size.height * 0.93);
       this.addChild(label3, 1);
       label4 = cc.LabelTTF.create("リセット：Ｒ", "Arial", 16);
       label4.setPosition(size.width / 6.6, size.height * 0.1);
       this.addChild(label4, 1);
       label5 = cc.LabelTTF.create("メニュー：Ｔ", "Arial", 16);
       label5.setPosition(size.width / 1.2, size.height * 0.1);
       this.addChild(label5, 1);

       zanki = cc.LabelTTF.create("× 5","Arial","26",cc.TEXT_ALIGNMENT_CENTER);
          this.addChild(zanki,1);
          zanki.setPosition(size.width / 1.1, size.height * 0.93);

          //キーボードリスナーの実装
          cc.eventManager.addListener({
              event: cc.EventListener.KEYBOARD,
              onKeyPressed: function(keyCode, event) {

              if (keyCode == 82)  // r-Keyでリセット
                  idouR2();
              },

          },this);

          cc.eventManager.addListener({
              event: cc.EventListener.KEYBOARD,
              onKeyPressed: function(keyCode, event) {

              if (keyCode == 84)  // t-Keyでタイトル
                  idouT();
              },

          },this);


      cocos_box = cc.Sprite.create(res.cocos_png);
      cocos_box.setScale(0.5);
      cocos_box.setPosition(size.width / 2, size.height / 2);

      this.addChild(cocos_box, 1);
      //cocos_box.setVisible(false);

      arrow_node = new cc.DrawNode();
      this.addChild(arrow_node, 10);
      arrow_line = new cc.DrawNode();
      this.addChild(arrow_line, 11);

      var points = [new cc.Point(0, 0),
         new cc.Point(-8, -10),
         new cc.Point(-3, -10),
         new cc.Point(0, -20),
         new cc.Point(3, -10),
         new cc.Point(8, -10),
      ]

      var fillColor = new cc.Color(128, 128, 128, 128);
      var lineWidth = 1;
      var lineColor = new cc.Color(255, 255, 255, 128);
      arrow_node.drawPoly(points, fillColor, lineWidth, lineColor);
      arrow_node.setPosition(size.width / 2, size.height / 2);

      this.scheduleUpdate();

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
     startTouch = touch.getLocation();

     cocos_box.setPosition(startTouch);
     arrow_node.setPosition(startTouch);

     return true;
  },
  onTouchMoved: function(touch, event) {
     endTouch = touch.getLocation();
     touching = true;
  },
  onTouchEnded: function(touch, event) {
     endTouch = touch.getLocation();
     touching = false;

     miss--;
     zanki.setString("× " + miss);

     //衝撃
     shape.body.applyImpulse(cp.v(dX * -2.3,dY * -2.3), cp.v(10, 10));

     if(miss < 0){
       cc.director.runScene(new OverScene());
       miss = 5;
     }
     //cc.director.runScene(new MyScene());
  },
  update: function(dt) {
    bonus--;
    label2.setString("ボーナス : " + bonus);
       if (touching) {
          //現在タッチしているX座標と前回の座標の差分をとる
          arrow_line.setVisible(true);
          arrow_node.setVisible(true);

          this.calcDirection();
       } else {
          arrow_line.setVisible(false);
          arrow_line.clear();
          arrow_node.setVisible(false);
          arrow_node.clear();
       }

    },
    calcDirection: function() {
      dX = endTouch.x - startTouch.x;
      dY = endTouch.y - startTouch.y;
      dZ = Math.sqrt(dX * dX + dY * dY);

      debug_label1.setString(Math.floor(dZ * Math.pow(10, 2)) / Math.pow(10, 2));

      //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
      if (dZ > 60) {

         //  if (Math.abs(dX) > 5 || Math.abs(dY) > 5) {
         //角度（ラジアン）を求める
         var radian = Math.atan2(dY, dX)
            //角度（ラジアン）を角度（度数）に変換
         var angle = radian * 180 / Math.PI;
         //矢印を回転させる

         //前回の描画を消す
         arrow_line.clear();
         arrow_node.clear();

         var pos = cocos_box.getPosition();
         //中央に線を引いてみた　これはなくてもいいな
         arrow_line.drawSegment(cc.p(pos.x, pos.y),
            cc.p(endTouch.x, endTouch.y), 1,
            new cc.Color(255, 255, 255, 64));
         debug_label2.setString(Math.floor(angle * Math.pow(10, 2)) / Math.pow(10, 2));

         //ドラックした長さを矢印のしっぽの位置にする
         var points = [new cc.Point(0, 0),
            new cc.Point(-35, -35),
            new cc.Point(-15, -35),
            new cc.Point(0, -(dZ - 10)),
            new cc.Point(15, -35),
            new cc.Point(35, -35),
         ]

         //矢印を描画する
         var fillColor = new cc.Color(128, 128, 128, 128);
         var lineWidth = 1;
         var lineColor = new cc.Color(255, 255, 255, 128);
         arrow_node.drawPoly(points, fillColor, lineWidth, lineColor);
         //矢印はもともと270度の位置にあるので、回転角度を減算する
         arrow_node.setRotation(270 - angle);

      }



   },

});

var game2 = cc.Layer.extend({
    init:function () {
        this._super();
        //var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf,0x9f,0x83,255),cc.color(0xfa,0xf7,0x9f,255));
        //this.addChild(backgroundLayer);
        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(world.staticBody,
           cp.v(-4294967294, -100), // start point
           cp.v(4294967295, -100), // MAX INT:4294967295
           0); // thickness of wall
        world.addStaticShape(wallBottom);


        // this.addBody(240,10,480,20,false,res.ground_png,"ground");
        // this.addBody(204,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(276,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(240,56,96,24,true,res.brick4x1_png,"destroyable");
        // this.addBody(240,80,48,24,true,res.brick2x1_png,"solid");
        // this.addBody(228,104,72,24,true,res.brick3x1_png,"destroyable");
        // this.addBody(240,140,96,48,true,res.brick4x2_png,"solid");
        // this.addBody(240,188,24,48,true,res.totem_png,"totem");

        this.addBody(60,188,24,28,true,res.ball_png,SpriteTag.totem);
        this.addBody(240,10,480,20,false,res.ground2_png,SpriteTag.ground);
        this.addBody(230,30,100,30,false,res.mizu,SpriteTag.destroyable);
        this.addBody(330,30,100,30,false,res.mizu2,SpriteTag.destroyable);
        //this.addBody(250,200,24,24,false,res.kusa1,SpriteTag.destroyable);
        this.addBody(330,60,60,60,false,res.rapu,SpriteTag.target);
        this.addBody(400,70,60,150,false,res.ki,SpriteTag.destroyable);
        this.addBody(400,470,60,150,false,res.ki,SpriteTag.destroyable);
        this.addBody(150,96,60,150,false,res.ki,SpriteTag.destroyable);
        this.addBody(150,240,60,150,false,res.ki,SpriteTag.destroyable);
        this.addBody(60,44,96,48,false,res.brick4x2_png,SpriteTag.solid);
        this.addBody(220,250,50,30,false,res.saku,SpriteTag.solid);
        this.addBody(269,250,50,30,false,res.saku,SpriteTag.solid);
        this.addBody(200,216,40,30,false,res.kusa1,SpriteTag.solid);
        this.addBody(230,216,40,30,false,res.kusa1,SpriteTag.solid);
        this.addBody(250,216,40,30,false,res.kusa1,SpriteTag.solid);
        this.addBody(280,216,40,30,false,res.kusa1,SpriteTag.solid);
        this.addBody(210,-10,10000,1,false,res.ground_png,SpriteTag.out);


        this.scheduleUpdate();
        cc.eventManager.addListener(touchListener, this);
        world.setDefaultCollisionHandler (this.collisionBegin,null,null,null);

    },
    addBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
        if(isDynamic){
            var body = new cp.Body(1,cp.momentForBox(1,width,height));
        }
        else{
            var body = new cp.Body(Infinity,Infinity);
        }
        body.setPos(cp.v(posX,posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayer2.addChild(bodySprite,0);
        bodySprite.setPosition(posX,posY);
        if(isDynamic){
            world.addBody(body);
        }
        shape = new cp.BoxShape(body, width, height);
        shape.setFriction(1);
        shape.setElasticity(0);
        shape.name=type;
        shape.setCollisionType(type);
        shape.image=bodySprite;
        world.addShape(shape);
        shapeArray.push(shape);
      //  shape = shapeArray[0];
    },
    update:function(dt){
        world.step(dt);

        for(var i=shapeArray.length-1;i>=0;i--){
            shapeArray[i].image.x=shapeArray[i].body.p.x
            shapeArray[i].image.y=shapeArray[i].body.p.y
            var angle = Math.atan2(-shapeArray[i].body.rot.y,shapeArray[i].body.rot.x);
            shapeArray[i].image.rotation= angle*57.2957795;
        }
    },
    collisionBegin : function (arbiter, space ) {
      /*
        if((arbiter.a.name=="totem" && arbiter.b.name=="ground") || (arbiter.b.name=="totem" && arbiter.a.name=="ground")){
            console.log("Oh no!!!!");
        }
        */

        if(arbiter.a.name== SpriteTag.totem && arbiter.b.name== SpriteTag.ground ) {
           cc.audioEngine.playEffect(res.landing_mp3);
        }
        if(arbiter.a.name== SpriteTag.totem && arbiter.b.name== SpriteTag.target ) {
          cc.director.runScene(new ClearScene());
           cc.audioEngine.playEffect(res.landing_mp3);
        }
        if(arbiter.a.name== SpriteTag.totem && arbiter.b.name== SpriteTag.out ) {
          cc.director.runScene(new OverScene());
           cc.audioEngine.playEffect(res.landing_mp3);
        }
        return true;
    },


});


var touchListener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
   swallowTouches: false, // 以降のノードにタッチイベントを渡す
   onTouchBegan: function(touch, event) { // タッチ開始時
      var pos = touch.getLocation();

      console.log("shapeArray.length:", shapeArray.length)
         // すべてのshapをチェックする
      for (var i = 0; i < shapeArray.length; i++) {
         //var shape = shapeArray[i];
           shape = shapeArray[i];
         console.log("shape.type:", i, shape.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
         if (shape.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
            console.log("hit ")
          /*  if (shape.name == SpriteTag.destroyable) {
               //ブロックをタップしたときは、消去する
               world.removeBody(shape.getBody());
               world.removeShape(shape);
               gameLayer.removeChild(shape.image);
               shapeArray.splice(i, 1);
               console.log("remove block")
               return;
            } else*/ if (shape.name == SpriteTag.totem) {
               // トーテムをタップしたときは、衝撃を与える
               //shape.body.applyImpulse(cp.v(500, 0), cp.v(0, -20))
               return;
            }
         }
      }
      // 何も無い場所をタップしたときは箱を追加する
      //gameLayer.addBody(pos.x,pos.y,24,24,true,res.brick1x1_png,SpriteTag.destroyable);
      return;

   }

});

function idouR2(){
  cc.director.runScene(new SecondScene());
}

function idouT(){
  cc.director.runScene(new TitleScene());
}

/*
var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArray.length-1;i>=0;i--){
            if(shapeArray[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArray[i].name== SpriteTag.destroyable ){
                    gameLayer.removeChild(shapeArray[i].image);
                    world.removeBody(shapeArray[i].getBody())
                    world.removeShape(shapeArray[i])
                    shapeArray.splice(i,1);
                }
            }
        }
    }
});
*/
