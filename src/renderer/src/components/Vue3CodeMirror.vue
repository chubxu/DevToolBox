<template>
  <div class="code-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror"
import "codemirror/lib/codemirror.css"


import "codemirror/theme/idea.css"
import "codemirror/theme/darcula.css"

import "codemirror/addon/edit/matchbrackets"
import "codemirror/addon/selection/active-line"

import "codemirror/addon/edit/closebrackets"

import "codemirror/addon/fold/foldgutter"
import "codemirror/addon/fold/foldgutter.css"
import "codemirror/addon/fold/xml-fold"
import "codemirror/addon/fold/foldcode"
import "codemirror/addon/fold/brace-fold"
import "codemirror/addon/fold/indent-fold.js"
import "codemirror/addon/fold/markdown-fold.js"
import "codemirror/addon/fold/comment-fold.js"

function dynamicImport (props) {
  if (props.mode === 'javascript') {
      import('codemirror/mode/javascript/javascript')
    } else if (props.mode === 'xml') {
      import('codemirror/mode/xml/xml')
    } else if (props.mode === 'yaml') {
      import('codemirror/mode/yaml/yaml')
    } else if (props.mode === 'properties') {
      import('codemirror/mode/properties/properties')
    } else if (props.mode === 'go') {
      import('codemirror/mode/go/go')
    }
}
export default {
  name: "Vue3CodeMirror",

  props: {
    code: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "javascript"
    },
    theme: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    refreshRealTime: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    dynamicImport(props)
    let codeMirrorEditor = null
    const init = el => {
      codeMirrorEditor = CodeMirror.fromTextArea(el, {
        // 语言模式
        mode: props.mode,
        // 主题样式
        theme: props.theme,
        // tab字符的大小
        tabSize: 2,
        // 缩进值
        indentUnit: 2,
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
        // autofocus: true,
      })
    }

    const getValue = () => {
      if (codeMirrorEditor) {
        codeMirrorEditor.getValue()
      }
    }

    const setValue = (value) => {
      if (codeMirrorEditor) {
        codeMirrorEditor.setValue(value)
      }
    }
    
    const onChange = () => {
      if (codeMirrorEditor) {
        codeMirrorEditor.on("change", cm => {
          context.emit("change", cm.getValue())
        })
      }
    }

    const getTheme = () => {
      if (codeMirrorEditor) {
        codeMirrorEditor.getOption("theme")
      }
    }

    const setTheme = (theme) => {
      if (codeMirrorEditor) {
        codeMirrorEditor.setOption("theme", theme)
      }
    }

    const refresh = () => {
      if (codeMirrorEditor) {
        codeMirrorEditor && codeMirrorEditor.refresh();
      }
    }

    return {
      init,
      getValue,
      setValue,
      onChange,
      getTheme,
      setTheme,
      refresh,
    }
  },

  watch: {
    code(newValue, oldValue) {
      if (this.refreshRealTime) {
        const editorValue = this.getValue()
        if (newValue !== editorValue) {
          this.setValue(newValue)
          setTimeout(() => {
            this.refresh();
          }, 20);
        }
      }
    },

    theme(newValue, oldValue) {
      const theme = this.getTheme()
      if (newValue !== theme) {
        this.setTheme(newValue)
        setTimeout(() => {
          this.refresh();
        }, 20);
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.init(this.$refs.textarea)
      this.setValue(this.code)
      this.onChange()
    }, 20);
    
    
  }
}
</script>

<style scoped>
.code-editor {
    width: 100%;
}
</style>