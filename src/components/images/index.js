// @flow
import {Image}  from "react-native";
import base64 from 'base-64';

export default class Images {

    //static login = base64.encode('./login.jpg');
    /*static signUp = "./signUp.jpg";
    static drawer = "./drawer.jpg";
    static home = "./home.jpg";
    static lists = "./lists.jpg";
    static timeline = "./timeline.jpg";

    static defaultAvatar = "./avatars/default-avatar.jpg";
    static avatar1 = "./avatars/avatar-1.jpg";
    static avatar2 = "./avatars/avatar-2.jpg";
    static avatar3 = "./avatars/avatar-3.jpg";

    static foodGroup = "./groups/food.jpg";
    static workGroup = "./groups/work.jpg";
    static vacationGroup = "./groups/vacation.jpg";
    static citiesGroup = "./groups/cities.jpg";*/

    static downloadAsync(): Promise<*>[] {
        return [
            //Image.prefetch(Images.login),
            /*Image.prefetch(Images.signUp),
            Image.prefetch(Images.drawer),
            Image.prefetch(Images.home),
            Image.prefetch(Images.lists),
            Image.prefetch(Images.timeline),

            Image.prefetch(Images.defaultAvatar),
            Image.prefetch(Images.avatar1),
            Image.prefetch(Images.avatar2),
            Image.prefetch(Images.avatar3),

            Image.prefetch(Images.foodGroup),
            Image.prefetch(Images.workGroup),
            Image.prefetch(Images.vacationGroup),
            Image.prefetch(Images.citiesGroup),*/
        ];
    }
}
