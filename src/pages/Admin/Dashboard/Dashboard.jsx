import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import classConfig from "../../../utils/config/class.config.js";
import { createChart } from "lightweight-charts";
import useAxiosServer from "../../../hooks/useAxiosServer.js";
import { apiUrl } from "../../../utils/config/api.config.js";
import { Divider } from "@nextui-org/react";
import TabHeader from "../../../components/Tab/TabHeader.jsx";

function Dashboard(props) {

    const orderChart = useRef(null);
    const orderChartAreaSeries = useRef(null);

    const userChart = useRef(null);
    const userChartAreaSeries = useRef(null);

    const [totalOrders, setTotalOrders] = useState(null);
    const [todayOrders, setTodayOrders] = useState(null);
    const [orderChartData, setOrderChartData] = useState(null);

    const [totalUsers, setTotalUsers] = useState(null);
    const [todayUsers, setTodayUsers] = useState(null);
    const [userChartData, setUserChartData] = useState(null);

    const [fetchState, setFetchState] = useState(false);

    const axiosServer = useAxiosServer();
    const getChartData = () => {
        axiosServer.get(apiUrl.analytics.all)
            .then((response) => response.data)
            .then((response) => {
                setTotalOrders(response.data["totalOrdersPerDay"]["totalOrders"]);
                setTodayOrders(response.data["totalOrdersPerDay"]["todayOrders"]);
                setOrderChartData(response.data["totalOrdersPerDay"]["chartData"]);

                setTotalUsers(response.data["totalUsersPerDay"]["totalUsers"]);
                setTodayUsers(response.data["totalUsersPerDay"]["todayUsers"]);
                setUserChartData(response.data["totalUsersPerDay"]["chartData"]);
                setFetchState(true);
            });
    };

    const setConfigOrderChart = () => {
        if (!orderChart.current) {
            const chartOptions = { layout: { textColor: "black", background: { type: "solid", color: "white" } } };
            orderChart.current = createChart(document.getElementById("orderChart"), chartOptions);
            orderChart.current.priceScale("right").applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0
                }
            });
            orderChartAreaSeries.current = orderChart.current.addAreaSeries({
                lineColor: "#2962FF",
                topColor: "#2962FF",
                bottomColor: "rgba(41, 98, 255, 0.28)"
            });

            orderChart.current.timeScale().fitContent();
        }
    };

    const setConfigUserChart = () => {
        if (!userChart.current) {
            const chartOptions = { layout: { textColor: "black", background: { type: "solid", color: "white" } } };
            userChart.current = createChart(document.getElementById("userChart"), chartOptions);
            userChart.current.priceScale("right").applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0
                }
            });
            userChartAreaSeries.current = userChart.current.addAreaSeries({
                lineColor: "#2962FF",
                topColor: "#2962FF",
                bottomColor: "rgba(41, 98, 255, 0.28)"
            });

            userChart.current.timeScale().fitContent();
        }
    };

    useEffect(() => {
        getChartData();
    }, []);

    useEffect(() => {
        if (!fetchState) {
            setConfigOrderChart();
            setConfigUserChart();
        }

    }, [fetchState]);

    useEffect(() => {
        if (orderChartData?.length > 0) {
            orderChartAreaSeries.current.setData(orderChartData);
        }

        if (userChartData?.length > 0) {
            userChartAreaSeries.current.setData(userChartData);
        }
    }, [orderChartData, userChartData]);

    return (
        <div className={"w-full flex justify-center"}>
            <div className={"w-full max-w-7xl flex flex-col gap-4"}>
                <div className={"w-full flex flex-col gap-4"}>
                    <TabHeader tabTitle={"Thống kê đơn hàng"}/>
                    <div className={"w-full flex items-center justify-between gap-4"}>
                        <div className={"flex flex-col items-center gap-4"}>
                            <p className={"w-max"}>Tổng số đơn hàng</p>
                            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.secondary)}>{totalOrders || 0}</h3>
                        </div>
                        <Divider orientation={"vertical"}/>
                        <div className={"flex flex-col items-center gap-4"}>
                            <p className={"w-max"}>Đơn hàng hôm nay</p>
                            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.secondary)}>{todayOrders || 0}</h3>
                        </div>
                        <Divider orientation={"vertical"}/>
                        <div className="w-full max-w-7xl min-h-72" id={"orderChart"}>
                        </div>
                    </div>
                </div>
                <div className={"w-full flex flex-col gap-4"}>
                    <TabHeader tabTitle={"Thống kê tài khoản"}/>
                    <div className={"w-full flex items-center justify-between gap-4"}>
                        <div className={"flex flex-col items-center gap-4"}>
                            <p className={"w-max"}>Tổng số tài khoản</p>
                            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.secondary)}>{totalUsers || 0}</h3>
                        </div>
                        <Divider orientation={"vertical"}/>
                        <div className={"flex flex-col items-center gap-4"}>
                            <p className={"w-max"}>Tài khoản mới hôm nay</p>
                            <h3 className={classNames(classConfig.fontSize.h3, classConfig.textColor.secondary)}>{todayUsers || 0}</h3>
                        </div>
                        <Divider orientation={"vertical"}/>
                        <div className="w-full max-w-7xl min-h-72" id={"userChart"}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;