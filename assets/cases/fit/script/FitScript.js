const { ccclass, property } = cc._decorator;

let DesignWidth = 1920;
let DesignHeight = 1080;
let DesignRatio = DesignWidth/DesignHeight;

@ccclass
export default class FitScript extends cc.Component {

    @property
    BG = false;    //是否为背景层

    @property
    UI = false;    //是否为UI层

    _viewSize = null;

    onLoad() {
        //获取屏幕分辨率:原生平台上返回屏幕大小，在web上，它返回画布的外部DOM元素的大小。
        this._viewSize = cc.view.getFrameSize();
        if (!cc.sys.isNative) {
            this._viewSize = cc.find('Canvas').getContentSize();
        }
        this.fit();
    }

    fit() {
        if (this.BG) {
            this._fitBGLayer();
        }
        if (this.UI) {
            this._fitUILayer();
        }
    }

    _fitBGLayer() {
        let viewRatio = this._viewSize.width / this._viewSize.height;
        let scaleRatio = 1;
        if (DesignRatio >= viewRatio) {
            //适配高度
            scaleRatio = this._viewSize.height / DesignHeight;
        }
        if (DesignRatio < viewRatio) {
            //适配宽度
            scaleRatio = this._viewSize.width / DesignWidth;
        }
        this.node.scaleX = scaleRatio;
        this.node.scaleY = scaleRatio;
        this.node.x = this._viewSize.width/2;
        this.node.y = this._viewSize.height/2;
    }

    _fitUILayer() {
        let viewRatio = this._viewSize.width / this._viewSize.height;
        let scaleRatio = 1;
        if (DesignRatio >= viewRatio) {
            //适配宽度
            scaleRatio = this._viewSize.width / DesignWidth;
        }
        if (DesignRatio < viewRatio) {
            //适配高度
            scaleRatio = this._viewSize.height / DesignHeight;
        }
    
        this.node.width = this._viewSize.width;
        this.node.height = this._viewSize.height;

        this.node.x = this._viewSize.width/2;
        this.node.y = this._viewSize.height/2;

        //子控件的位置，由Widget组件通过百分控制
        //缩放子控件
        var childrens = this.node.children;
        childrens.forEach((item)=>{
            item.scale = scaleRatio;
        });

    }

    _isIphoneX() {
        if(cc.sys.os == cc.sys.OS_IOS){
            if (cc.sys.isNative) {
                if(this._viewSize.height > this._viewSize.width){
                    if (this._viewSize.height == 2436 && this._viewSize.width == 1125){
                        //是iphoneX
                        return true;
                    }else{
                        //不是iphoneX
                        return false
                    } 
                }else{
                    if (this._viewSize.height == 1125 && this._viewSize.width == 2436){
                        //是iphoneX
                        return true;
                    }else{
                        //不是iphoneX
                        return false;
                    } 
                }
            } else {
                if(this._viewSize.height > this._viewSize.width){
                    if (this._viewSize.height == 812 && this._viewSize.width == 375){
                        //是iphoneX
                        return true;
                    }else{
                        //不是iphoneX
                        return false
                    } 
                }else{
                    if (this._viewSize.height == 375 && this._viewSize.width == 812){
                        //是iphoneX
                        return true;
                    }else{
                        //不是iphoneX
                        return false;
                    } 
                }
                
            }
        }else{
            return false;
        }
        
    }

}
