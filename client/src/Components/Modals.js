import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

class Modals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  onClose = () => {
    this.setState({open: false})
  }

  render () {
    const { onClose, title, content: Content } = this.props;
    const { open } = this.state;

    return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content className="modal-content">
      {Content !== undefined ?
        <Content onClose={() => this.onClose()}/> : <div></div>}
      <Button content="Cancel" onClick={onClose} />
      </Modal.Content>
    </Modal>
    );
  }
}

export default Modals