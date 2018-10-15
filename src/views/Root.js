import React, { Component } from "react";
import { connect } from "react-redux";

class Root extends Component {
  render() {
    const { categories } = this.props;
    console.log(categories);
    return (
      <div className="Root">
        <ul>
          {categories.map(category => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(category => categories[category])
  };
}

export default connect(mapStateToProps)(Root);
