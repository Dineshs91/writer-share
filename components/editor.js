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
import { useState } from "react";
import { fontFamilies } from "../utils/constants";
import Font from "../components/font";

function Placeholder() {
  return <div className="p-11 editor-placeholder">Enter some text...</div>;
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
  let [fontSize, setFontSize] = useState(15)
  let [selectedFont, setSelectedFont] = useState(fontFamilies[0])

  const fontSizeChange = (val) => {
    setFontSize(val)
  }

  const selectedFontChange = (val) => {
    setSelectedFont(val)
  }

  return (
    <section>
      <Font fontFamily={selectedFont} />
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container w-full">
          <div className="overflow-x-scroll md:w-full bg-white px-4 rounded-xl shadow-lg">
            <motion.li className='item' variants={props.item}>
              <ToolbarPlugin 
                fontSizeChange={fontSizeChange}
                fontSize={fontSize} 
                selectedFont={selectedFont}
                selectedFontChange={selectedFontChange}
              />
            </motion.li>
          </div>

          <motion.li className='item' variants={props.item}>
            <div className="mt-4 overflow-x-scroll py-8 px-1">
              <div style={{backgroundColor: props.bgColor}} className="rounded-2xl shadow-lg">
                <div style={{width:props.eleWidth}} className="mx-auto">
                  <div ref={props.ele} 
                  style={{ padding: "50px", fontFamily: selectedFont, fontSize:fontSize + "px", width:props.eleWidth, backgroundColor: props.bgColor}} 
                  className="h-auto editor-inner rounded-lg">
                    <RichTextPlugin
                      contentEditable={<ContentEditable  className="editor-input" />}
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
    </section>
  );
}
