import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from "react-router-dom";
import { Loading } from './LoadingComponent';
import  CommentForm  from './CommentComponent';
import { baseUrl } from '../shared/baseUrl';


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
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

function DishDetail(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} comments={props.comments}/>
                    <RenderComments comments={props.comments}
                                    addComment={props.addComment}
                                    dishId={props.dish.id}/>
                </div>
            </div>
        );
    }
}

export default DishDetail;
