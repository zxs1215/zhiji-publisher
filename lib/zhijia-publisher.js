'use babel';

import ZhijiaPublisherView from './zhijia-publisher-view';
import { CompositeDisposable } from 'atom';

var exec = require('child_process').exec

export default {

  zhijiaPublisherView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.zhijiaPublisherView = new ZhijiaPublisherView(state.zhijiaPublisherViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.zhijiaPublisherView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zhijia-publisher:toggle': () => this.toggle(),
      'zhijia-publisher:init': () => this.initzj()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.zhijiaPublisherView.destroy();
  },

  serialize() {
    return {
      zhijiaPublisherViewState: this.zhijiaPublisherView.serialize()
    };
  },

  toggle() {
    var path = atom.project.getPaths()

    for(var i in path){
        var cmd = 'start zhijia up'
        exec(cmd, {cwd: path[i]})
    }
  },
  initzj(){
    var path = atom.project.getPaths()
    console.log('s')
    for(var i in path){
        var cmd = 'start zhijia init'
        exec(cmd, {cwd: path[i]})
    }
  }

};
