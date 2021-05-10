import { UserDocumentJSON } from "../models/interfaces/IUser";
import { UserReequest } from "../models/requests/user.request";
import { UserDocument, UserModel } from "../models/schemas/user.schema";
import { Utilities } from "../utilities/utits";
import { BaseService } from "./base.service";

export class UserService extends BaseService<UserDocument, UserDocumentJSON> {

    utilities: Utilities;

    constructor() {
        super();
        this.Model = UserModel;
        this.utilities = new Utilities();
    }
    //  for superadmin
    public async getUserList() {
        const userList = await this.Model.find({ isActive: true, isDeleted: false, role: "staff" });
        return userList;
    }

    // for superamdin

    public async getUserDetail(id: string) {
        const user = await this.Model.findById(id, { isActive: true, isDeleted: false, role: "staff" });
    }

    public async addUser(req: UserReequest) {
        const hashPassword = this.utilities.hashPassword(req.secret);
        const user = await new UserModel(
            {
                name: req.name,
                role: req.role,
                team: req.team,
                username: req.username,
                secret: hashPassword
            }
        ).save();

        return user;
    }

    public async login(req: { username: string, secret: string }) {
        let result: any;
        const user: any = await this.Model.findOne({ username: req.username });

        if (!user) {
            result = "Invalid Username";
        } else {
            if (!this.utilities.validatePassword(user.secret, req.secret)) {
                result = "Invalid Password";
            } else {
                result = {
                    token: this.utilities.generateToken(user),
                    user: {
                        "isActive": user.isActive,
                        "isDeleted": user.isDeleted,
                        "_id": user._id,
                        "name": user.name,
                        "role": user.role,
                        "team": user.team,
                        "username": user.username,
                        "createdAt": user.createdAt,
                        "updatedAt": user.updatedAt,
                        "__v": user.__v
                    }
                };
            }
        }
        return result;
    }

    public async updateUser(id: string, req: UserReequest) {

    }

    public async deleteUser(id: string) {

    }

}