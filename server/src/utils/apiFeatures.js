class APIFetures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludefields = ["page", "sortby", "limit", "fields"];
    excludefields.forEach((el) => delete queryObj[el]);
    if (queryObj.numericFields) {
      const operatorMap = {
        ">=": "$gte",
        ">": "$gt",
        "<=": "$lte",
        "<": "$lt",
        "=": "$eq",
      };
      const options = ["price", "quantity"];
      const rexEx = /\b(>=|>|<=|<|=)\b/g;
      let query = queryObj.numericFields.replace(
        rexEx,
        (match) => `-${operatorMap[match]}-`
      );
      query.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObj[field] = {
            ...queryObj[field],
            [operator]: Number(value),
          };
        }
      });
      delete queryObj["numericFields"];
    }
    console.log(queryObj);
    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryStr.sortby) {
      const sortBy = this.queryStr.sortby.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const selectedFields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    let { limit, page } = { ...this.queryStr };
    limit = limit * 1 || 10;
    page = page * 1 || 1;
    this.query = this.query.skip((page - 1) * limit).limit(limit);

    return this;
  }
}

module.exports = APIFetures;
