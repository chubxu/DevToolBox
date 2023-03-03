<template>
  <div class="json-editor">
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
import "codemirror/addon/fold/foldgutter.css"
import "codemirror/addon/fold/foldgutter"
import "codemirror/addon/fold/xml-fold"
import "codemirror/addon/fold/foldcode"
import "codemirror/addon/fold/brace-fold"
import "codemirror/addon/fold/indent-fold.js"
import "codemirror/addon/fold/markdown-fold.js"
import "codemirror/addon/fold/comment-fold.js"

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

  data() {
    return {
      codeMirrorEditor: "",
    };
  },

  methods: {
    refresh() {
      this.codeMirrorEditor && this.codeMirrorEditor.refresh();
    }
  },

  watch: {
    code(newValue, oldValue) {
      const editorValue = this.codeMirrorEditor.getValue()
      if (newValue != editorValue) {
        this.codeMirrorEditor.setValue(newValue)
        setTimeout(() => {
          this.codeMirrorEditor.refresh();
        }, 1);
      }
    }
  },

  mounted() {
    this.codeMirrorEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      mode: "application/json",
      theme: "twilight", // 主题样式
      tabSize: 2,
      indentUnit: 2,
      smartIndent: true, // 是否智能缩进
      styleActiveLine: false, // 当前行高亮
      lineNumbers: true, // 显示行号
      gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers",
      ],
      lineWrapping: true, // 自动换行
      matchBrackets: true, // 括号匹配显示
      autoCloseBrackets: true, // 输入和退格时成对
      readOnly: this.readonly, // 只读
      foldGutter: true,
      showCursorWhenSelecting: true,
    })
    this.codeMirrorEditor.setValue(this.code)
    this.codeMirrorEditor.on("change", cm => {
        this.$emit("change", cm.getValue())
    })
  }
}
</script>

<style scoped>
.json-editor {
    height: 100%;
    position: relative;
}
/* 高度自适应 */
.json-editor .CodeMirror {
    height: auto;
}
.json-editor .CodeMirror-scroll {
    height: auto;
    overflow-y: hidden;
    overflow-x: auto;
}

.CodeMirror-foldgutter-folded.CodeMirror-guttermarker-subtle {
    color: black !important;
    font-size: 14px;
}
.CodeMirror-foldgutter-open:after {
    color: black !important;
    font-size: 14px;
}
.json-editor .cm-string {
    color: coral !important;
}
</style>