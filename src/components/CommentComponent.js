import {Control, Errors, Form} from "react-redux-form";
import React,{Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from "reactstrap";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => (!val) || (val && (val.length >= len));

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {isModalOpen: false};
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    handleSubmitComment(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.resetFeedbackForm();
        // event.preventDefault();

    }

    toggleModal(){
        this.setState({isModalOpen : !this.state.isModalOpen});
    }

    render(){
        return(
            <>
                <Button className="btn btn-default" onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select className="form-control" model=".rating" id="rating" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" className="form-control" id="name" name="name" placeholder="Your Name" validators={{minLength:minLength(2), maxLength:maxLength(15)}}/>
                                    <Errors className="text-danger" model=".name" show="touched" messages={{minLength:"Must be greater than 2 characters", maxLength:"Must be 15 characters or less"}} />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Your Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" placeholder="Your Comment"/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
export default CommentForm;