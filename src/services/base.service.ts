import mongoose, { ClientSession } from "mongoose";
import { MyError, MyErrorCodeEnum } from "../utilities/errors";
export type TransformationInPlaceFunction = (x: mongoose.Document) => void;

export class BaseService<EntityModel extends mongoose.Document, EntityModelJSON> {
  Model: mongoose.Model<EntityModel, {}>;

  public async _count(queryObj?: any) {
    try {
      // TODO @harshilp9 Below doesn't use indices. VERY BAD PERMORMANCE
      return this.Model.countDocuments(queryObj || {});
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Get list of entities
   * @param queryObj search query
   */
  public async _list(queryObj: any = {}, populateObj: mongoose.ModelPopulateOptions = undefined, limit: any = undefined, skip: any = undefined, select?: any, sort?: any, session?: ClientSession) {
    try {
      let query;

      if (session) {
        query = this.Model.find(queryObj).session(session);
      } else {
        query = this.Model.find(queryObj);
      }

      if (populateObj) {
        query.populate(populateObj);
      }
      if (limit) {
        query = query.limit(parseInt(limit));
      }
      if (skip) {
        query = query.skip(parseInt(skip));
      }
      if (select) {
        query = query.select(select);
      }
      if (sort) {
        query = query.sort(sort);
      } else {
        query = query.sort({
          updatedAt: -1
        });
      }
      const documents = await query;
      return documents;
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }


  /**
   * Get list of entities
   * @param queryObj search query
   */
  public async _listMultiplePopulate(queryObj: any = {}, populateObj: mongoose.ModelPopulateOptions[] = undefined, limit: any = undefined, skip: any = undefined, select?: any, sort?: any) {
    try {
      let query = this.Model.find(queryObj);
      if (populateObj && populateObj.length > 0) {
        for (const pObj of populateObj) {
          query = query.populate(pObj);
        }
      }
      if (limit) {
        query = query.limit(parseInt(limit));
      }
      if (skip) {
        query = query.skip(parseInt(skip));
      }
      if (select) {
        query = query.select(select);
      }
      if (sort) {
        query = query.sort(sort);
      } else {
        query = query.sort({
          updatedAt: -1
        });
      }
      const documents = await query;
      return documents;
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Get list of entities
   * @param queryObj search query
   */
  public async _list_unique(queryObj: any = {}, field: string) {
    try {
      const query = this.Model.distinct(field, queryObj);
      const documents = await query;
      return documents.sort();
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Find single document by query
   * @param queryObj search query
   */
  public async _findOneWithError(queryObj: any = {}, session?: ClientSession, populateObj: mongoose.ModelPopulateOptions = undefined, selectObj: any = {}) {
    let document;

    if (session) {
      document = await this.Model.findOne(queryObj).select(selectObj).session(session);
    } else {
      document = await this.Model.findOne(queryObj).select(selectObj);
    }

    if (populateObj) {
      document = document.populate(populateObj);
    }
    if (document === null) {
      if (this.Model.modelName === "User" || this.Model.modelName === "Auth") {
        throw new MyError(MyErrorCodeEnum.TM003, `Not found!`);
      } else {
        throw new MyError(MyErrorCodeEnum.TM003, `The particular ${this.Model.modelName} entity not found.`);
      }
    }
    return document;
  }



  /**
   * Find single document by query
   * @param queryObj search query
   */
  public async _findOneWithoutError(queryObj: any = {}, selectObj: any = {}, populateObj: mongoose.ModelPopulateOptions = undefined, session?: ClientSession) {
    let document;

    if (session) {
      document = await this.Model.findOne(queryObj).select(selectObj).session(session);
    } else {
      document = await this.Model.findOne(queryObj).select(selectObj);
    }

    if (populateObj) {
      document = document.populate(populateObj);
    }
    return document;
  }

  /**
   * Find one object from the collection and throw error if not found
   * @param id _id to search by
   * @param populateObj the populate object to pass to mongoose
   */
  public async _detail(id: string, populateObj?: mongoose.ModelPopulateOptions, select?: any, session?: ClientSession): Promise<EntityModel> {
    try {
      const documentPromise = this.Model.findById(id);
      if (populateObj) {
        documentPromise.populate(populateObj);
      }
      if (select) {
        documentPromise.select(select);
      }
      if (session) {
        documentPromise.session(session);
      }
      const document = await documentPromise;
      if (document === null) {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      return document;
    } catch (error) {
      if (error.message === "Not Found") {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      if (error.name === "CastError") {
        throw new MyError(MyErrorCodeEnum.TM004, error.message);
      }
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Find one object from the collection and throw error if not found
   * Same _detail but doesn't throw error if not found.
   * @param id _id to search by
   * @param populateObj the populate object to pass to mongoose
   */
  public async _detailWithoutError(id: string, populateObj?: mongoose.ModelPopulateOptions): Promise<EntityModel> {
    try {
      const ret = this._detail(id, populateObj);
      return;
    } catch (error) {
      // tslint:disable-next-line: no-null-keyword
      if (error.code && error.code === MyErrorCodeEnum.TM003) return null;
      else throw error;
    }
  }


  /**.
   *
   * Create new entity
   * @param documentJSON Entity Data
   */
  public async _store(documentJSON: EntityModelJSON, transformation?: TransformationInPlaceFunction, session?: ClientSession) {
    try {
      const document = new this.Model(documentJSON);

      // -start
      // for backward compatibility the below 3 lines remain. not sure on impact to remove.
      const reqBody: any = documentJSON;
      if (reqBody.id) {
        document.id = reqBody.id;
      }
      // -end

      if (transformation) {
        transformation(document);
      }
      if (session) {
        document.$session(session);
        await document.save();
      } else {
        await document.save();
      }
      return document;
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Update an existing entity
   * @param id Entity Id
   * @param queryObj search query
   */
  public async _updateByQuery(queryObj: any = {}, request: object, session?: ClientSession) {
    try {
      let document;
      if (session) {
        document = await this.Model.updateMany(
          queryObj,
          request, (error, result) => {
            return result;
          }
        ).session(session);

      } else {
        document = await this.Model.updateMany(
          queryObj,
          request, (error, result) => {
            return result;
          }
        );
      }

      if (document === null) {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      return document;
    } catch (error) {
      if (error.message === "Not Found") {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      if (error.name === "CastError") {
        throw new MyError(MyErrorCodeEnum.TM004, error.message);
      }
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Update an existing entity
   * @param id Entity Id
   * @param request Entity Request
   */
  public async _update(id: string, request: object, session?: ClientSession) {
    try {
      let document;

      if (session) {
        document = await this.Model.findByIdAndUpdate(
          id,
          request, (error, result) => {
            return result;
          }
        ).session(session);
      } else {
        document = await this.Model.findByIdAndUpdate(
          id,
          request, (error, result) => {
            return result;
          }
        );
      }
      if (document === null) {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      return document;
    } catch (error) {
      if (error.message === "Not Found") {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      if (error.name === "CastError") {
        throw new MyError(MyErrorCodeEnum.TM004, error.message);
      }
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }
  /**
   * Update an existing entity
   * @param id Entity Id
   * @param request Entity Request
   */
  public async _updateOnly(id: string, request: object) {
    try {
      const queryObj: any = {
        _id: id
      };
      const document = await this.Model.updateOne(
        queryObj,
        request, (error, result) => {
          return result;
        }
      );
      if (document === null) {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      return document;
    } catch (error) {
      if (error.message === "Not Found") {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      if (error.name === "CastError") {
        throw new MyError(MyErrorCodeEnum.TM004, error.message);
      }
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Update an existing entity
   * @param id Entity Id
   * @param request Entity Request
   */
  public async _updateOnlyMultiple(ids: string[], request: object) {
    try {
      const queryObj: any = {
        _id: { $in: ids }
      };
      const document = await this.Model.updateMany(
        queryObj,
        request, (error, result) => {
          return result;
        }
      );
      if (document === null) {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      return document;
    } catch (error) {
      if (error.message === "Not Found") {
        throw new MyError(MyErrorCodeEnum.TM003, "Not Found");
      }
      if (error.name === "CastError") {
        throw new MyError(MyErrorCodeEnum.TM004, error.message);
      }
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }
  /**
   * Delete entitiy
   * @param id Entity Id
   */
  public async _delete(id: string) {
    try {
      const document = await this.Model.findByIdAndDelete(
        id, (error, result) => {
          return result;
        }
      );
      return document;
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }

  /**
   * Delete entitiy
   * @param id Entity Id
   */
  public async _deleteOnly(query: object) {
    try {
      const document = await this.Model.findOneAndDelete(query);
      return document;
    } catch (error) {
      throw new MyError(MyErrorCodeEnum.TM00X, error.message);
    }
  }
}
