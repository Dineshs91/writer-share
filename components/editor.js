import ExampleTheme from "../themes/ExampleTheme";
import LexicalComposer from "@lexical/react/LexicalComposer";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import AutoFocusPlugin from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode,  } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import LinkPlugin from "@lexical/react/LexicalLinkPlugin";
import ListPlugin from "@lexical/react/LexicalListPlugin";
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "../plugins/AutoLinkPlugin";
import { motion } from "framer-motion";

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

export default function Editor(props) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container w-full">
        <div className="overflow-x-scroll md:w-full bg-white px-4 rounded-lg shadow-xl">
          <motion.li className='item' variants={props.item}>
            <ToolbarPlugin />
          </motion.li>
        </div>

        <motion.li className='item' variants={props.item}>
          <div className="mt-8 overflow-x-scroll py-8 px-1">
            <div style={{backgroundColor: props.bgColor}} className="rounded-lg shadow-xl">
              <div style={{width:props.eleWidth}} className="mx-auto">
                <div ref={props.ele} style={{width:props.eleWidth, backgroundColor: props.bgColor}} className="h-auto editor-inner rounded-md">
                  <RichTextPlugin
                    contentEditable={<ContentEditable  className="editor-input rounded-md" />}
                    placeholder={<Placeholder />}
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                  <CodeHighlightPlugin />
                  <ListPlugin />
                  <LinkPlugin />
                  <AutoLinkPlugin />
                  <ListMaxIndentLevelPlugin maxDepth={7} />
                  <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />
                </div>
              </div>
            </div>
          </div>
        </motion.li>
      </div>
    </LexicalComposer>
  );
}
