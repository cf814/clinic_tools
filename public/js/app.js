// Simple pure-React component so we don't have to remember
// Bootstrap's classes
var BootstrapButton = React.createClass({
  render: function() {
    // transferPropsTo() is smart enough to merge classes provided
    // to this component.
    return this.transferPropsTo(
      <a href="javascript:;" role="button" className="btn">
        {this.props.children}
      </a>
    );
  }
});

var BootstrapModal = React.createClass({
  // The following two methods are the only places we need to
  // integrate with Bootstrap or jQuery!
  componentDidMount: function() {
    // When the component is added, turn it into a modal
    $(this.getDOMNode())
      .modal({backdrop: 'static', keyboard: false, show: false})
  },
  componentWillUnmount: function() {
    $(this.getDOMNode()).off('hidden', this.handleHidden);
  },
  close: function() {
    $(this.getDOMNode()).modal('hide');
  },
  open: function() {
    $(this.getDOMNode()).modal('show');
  },
  render: function() {
    var confirmButton = null;
    var cancelButton = null;

    if (this.props.confirm) {
      confirmButton = (
        <BootstrapButton
          onClick={this.handleConfirm}
          className="btn-primary">
          {this.props.confirm}
        </BootstrapButton>
      );
    }
    if (this.props.cancel) {
      cancelButton = (
        <BootstrapButton onClick={this.handleCancel} className="btn-default">
          {this.props.cancel}
        </BootstrapButton>
      );
    }

    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.handleCancel}>
                &times;
              </button>
              <h3>{this.props.title}</h3>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  },
  handleCancel: function() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },
  handleConfirm: function() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
});

var Example = React.createClass({
  handleCancel: function() {
    if (confirm('Are you sure you want to cancel?')) {
      this.refs.modal.close();
    }
  },
  render: function() {
    var modal = null;
    modal = (
      <BootstrapModal
        ref="modal"
        confirm="OK"
        cancel="Cancel"
        onCancel={this.handleCancel}
        onConfirm={this.closeModal}
        title="Hello, All!">
			<ul>
			<li>
			<a href="/tools/1">Tools 1</a>
			<a href="/tools/2">Tools 2</a>
			<a href="/tools/3">Tools 3</a>
			</li>
			</ul>
      </BootstrapModal>
    );
    return (
      <div className="example">
        {modal}
        <BootstrapButton onClick={this.openModal} className="btn-default">
          New Tools
        </BootstrapButton>
      </div>
    );
  },
  openModal: function() {
    this.refs.modal.open();
  },
  closeModal: function() {
    this.refs.modal.close();
  }
});

React.render(<Example />, document.getElementById('jqueryexample'));
