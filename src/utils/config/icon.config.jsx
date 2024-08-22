// icons.js
import { IoIosPaper, IoMdAdd, IoMdRemove } from "react-icons/io";
import classConfig from "./class.config.js";
import { IoArrowBack, IoLockClosed, IoLockOpen } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { FaCheck, FaStar } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

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
    },
    cancel: {
        base: <FaXmark size={classConfig.icon.base}/>,
        large: <FaXmark size={classConfig.icon.large}/>
    },
    confirm: {
        base: <FaCheck size={classConfig.icon.base}/>,
        large: <FaCheck size={classConfig.icon.large}/>
    },
    star: {
        base: <FaStar size={classConfig.icon.base}/>,
        large: <FaStar size={classConfig.icon.large}/>
    },
    block: {
        base: <MdBlock size={classConfig.icon.base}/>,
        large: <MdBlock size={classConfig.icon.large}/>
    },
    unBlock: {
        base: <IoLockOpen size={classConfig.icon.base}/>,
        large: <IoLockOpen size={classConfig.icon.large}/>
    },
    reason: {
        base: <IoIosPaper size={classConfig.icon.base}/>,
        large: <IoIosPaper size={classConfig.icon.large}/>
    }
};

export default iconConfig;
