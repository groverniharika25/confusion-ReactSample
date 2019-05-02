import React, {Component} from "react";
import {Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish() {
        return (
            <div className="container">
                <div className="row">
                    <Card>
                        <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name}/>
                        <CardBody>
                            <CardTitle>{this.props.selectedDish.name}</CardTitle>
                            <CardText>{this.props.selectedDish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
    renderComments(comments) {
        if (comments != null) {
            const commentList = comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {comment.date}</p>
                    </li>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentList}
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish.comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;