// icons.js
import {IoMdAdd, IoMdRemove} from "react-icons/io";
import classConfig from "./class.config.js";
import {IoArrowBack} from "react-icons/io5";
import {TfiMenuAlt} from "react-icons/tfi";
import {BiSolidEditAlt, BiSolidTrashAlt} from "react-icons/bi";

const iconConfig = {
    add: {
        base: <IoMdAdd size={classConfig.icon.base}/>,
        large: <IoMdAdd size={classConfig.icon.large}/>
    },
    minus: {
        base: <IoMdRemove size={classConfig.icon.base}/>,
        large: <IoMdRemove size={classConfig.icon.large}/>
    },
    back: {
        base: <IoArrowBack size={classConfig.icon.base}/>,
        large: <IoArrowBack size={classConfig.icon.large}/>
    },
    delete: {
        base: <BiSolidTrashAlt size={classConfig.icon.base}/>,
        large: <BiSolidTrashAlt size={classConfig.icon.large}/>
    },
    edit: {
        base: <BiSolidEditAlt size={classConfig.icon.base}/>,
        large: <BiSolidEditAlt size={classConfig.icon.large}/>
    },
    detail: {
        base: <TfiMenuAlt size={classConfig.icon.base}/>,
        large: <TfiMenuAlt size={classConfig.icon.large}/>
    }

};

export default iconConfig;
