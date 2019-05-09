import React,{Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from "react-router-dom";
import {Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from "reactstrap";
import {Control, LocalForm, Errors} from "react-redux-form";



function RenderComments({comments, addComment, dishId}) {
    const comment_blocks = comments.map((com)=>{
        return(
            <blockquote key={com.id} className="blockquote">
                <p className="mb-0">{com.comment}</p>
                <footer className="blockquote-footer">{com.author} ,  {new Intl.DateTimeFormat('en-IN', {year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(com.date))}</footer>
            </blockquote>
        );
    });

    return(
        <div className="col-md-6">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comment_blocks}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

function RenderDish({dish, comments}){
    if(dish != null){
         return(
            <div className="row">
                <div className="col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );

    }
    else{
        return (<div></div>);
    }
}

function DishDetail(props){
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} comments={props.comments} />
                <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}/>
            </div>
        </div>
    );
}


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
        console.log("Current State is : "+JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
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
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }

}

export default DishDetail;
