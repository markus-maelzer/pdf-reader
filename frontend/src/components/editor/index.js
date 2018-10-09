import React, { Component } from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer'

// progress link
// https://docs.slatejs.org/walkthroughs/applying-custom-formatting


export default class SlateEditor extends Component {
  state = {
    value: null,
  }

  onChange = (change, options = {}) => {
    const { value } = change;
    this.setState({ value });
  }

  componentDidMount() {
    const { text } = this.props;
    if(text) {
      console.log(Plain.deserialize(text));
      this.setState({
        value: Plain.deserialize(text)
      })
    }
  }

  onKeyDown = (e, change) => {
    if (!e.ctrlKey) return;
    switch (e.key) {
      // When "`" is pressed, keep our existing code block logic.
      case '+': {
        e.preventDefault();
        // Determine whether any of the currently selected blocks are code blocks.
        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code');
        return true;
      }
      default:
        return;
    }
  }

  renderNode = props => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />;
    }
  }

  render() {
    if(!this.state.value) return <div>loading</div>
    return (
      <div className="editor">
        <div className="overflow-hidden">
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
          />
        </div>
      </div>
    )
  }
}


const CodeNode = ({ attributes, children }) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
)
