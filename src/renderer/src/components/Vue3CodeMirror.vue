<template>
  <div class="code-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

// 主题样式（我直接用了纯白色的，看着比较舒服）
import "codemirror/theme/twilight.css"

// 括号显示匹配
import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/selection/active-line"

// 括号、引号编辑和删除时成对出现
import "codemirror/addon/edit/closebrackets"

// 折叠代码要用到一些玩意
import "codemirror/addon/fold/foldgutter"
import "codemirror/addon/fold/foldgutter.css"
import "codemirror/addon/fold/xml-fold"
import "codemirror/addon/fold/foldcode"
import "codemirror/addon/fold/brace-fold"
import "codemirror/addon/fold/indent-fold.js"
import "codemirror/addon/fold/markdown-fold.js"
import "codemirror/addon/fold/comment-fold.js"

import { ref } from 'vue'

export default {
  name: "Vue3CodeMirror",

  props: {
    code: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    let codeMirrorEditor = null
    const init = el => {
      codeMirrorEditor = CodeMirror.fromTextArea(el, {
        // 语言模式
        mode: "javascript",
        // 主题样式
        theme: "twilight",
        // tab字符的大小
        tabSize: 4,
        // 缩进值
        indentUnit: 4,
        // 是否智能缩进，使用后换行根据上下文自动缩进
        smartIndent: true,
        // 当前行高亮
        styleActiveLine: false,
        // 缩进的时候，是否把前面的N*tab大小的空间转化为N个tab字符
        indentWithTabs: true,
        // 显示行号
        lineNumbers: true,
        gutters: [
            "CodeMirror-linenumbers",
            "CodeMirror-foldgutter",
            "CodeMirror-lint-markers",
        ],
        // 自动换行
        lineWrapping: true,
        // 括号匹配显示
        matchBrackets: true,
        // 输入和退格时成对
        autoCloseBrackets: true,
        // 只读
        readOnly: props.readonly,
        foldGutter: true,
        showCursorWhenSelecting: true,
        autofocus: true,
      })
    }
    const setValue = (value) => {
      if (codeMirrorEditor) {
        codeMirrorEditor.setValue(value)
      }
    }
    const refresh = () => {
      this.codeMirrorEditor && this.codeMirrorEditor.refresh();
    }
    const onChange = () => {
      codeMirrorEditor.on("change", cm => {
        context.emit("change", cm.getValue())
      })
    }
    return {
      init,
      refresh,
      setValue,
      onChange,
    }
  },

  watch: {
    code(newValue, oldValue) {
      const editorValue = this.codeMirrorEditor.getValue()
      if (newValue != editorValue) {
        this.setValue(newValue)
        setTimeout(() => {
          this.refresh();
        }, 1);
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.init(this.$refs.textarea)
      this.setValue(this.code)
      this.onChange()
    }, 10);
    
    
  }
}
</script>

<style scoped>
.code-editor {
    height: 700px;
    width: 100%;
}
</style>