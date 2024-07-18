import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";

WarrantyPolicy.propTypes = {};

function WarrantyPolicy(props) {
    return (
        <section className={"flex flex-col gap-4"}>
            <h1 className={classNames(classConfig.fontSize.h4, classConfig.textColor.default)}>
                Chính sách bảo hành
            </h1>
            <div className={"flex flex-col gap-2 text-xl"}>
                <p>Tất cả sản phẩm tại <strong>hieutn.dev</strong> kinh doanh đều là sản phẩm chính hãng và được bảo
                    hành theo đúng chính sách của nhà sản xuất. Ngoài ra <strong>hieutn.dev</strong> cũng hỗ trợ gửi bảo
                    hành miễn phí giúp khách hàng đối
                    với cả
                    sản phẩm do <strong>hieutn.dev</strong> bán ra và sản phẩm Quý khách mua tại các chuỗi bán lẻ khác.
                </p>
                <p> Mua hàng tại <strong>hieutn.dev</strong>, Quý khách sẽ được hưởng những đặc quyền sau:</p>
                <ul className={"list-disc px-8 flex flex-col gap-2"}>
                    <li>Bảo hành đổi sản phẩm mới ngay tại shop trong 30 ngày nếu có lỗi NSX.</li>
                    <li>Gửi bảo hành chính hãng không mất phí vận chuyển.</li>
                    <li>Theo dõi tiến độ bảo hành nhanh chóng qua kênh hotline</li>
                    <li>Hỗ trợ làm việc với hãng để xử lý phát sinh trong quá trình bảo hành.</li>
                </ul>

                <p>Bên cạnh đó Quý khách có thể tham khảo một số các trường hợp thường gặp nằm ngoài chính sách bảo hành
                    sau để xác định sơ bộ máy có đủ điều kiện bảo hành hãng:</p>

                <ul className={"list-disc px-8 flex flex-col gap-2"}>
                    <li>Sản phẩm đã bị thay đổi, sửa chữa không thuộc các Trung Tâm Bảo Hành Ủy Quyền của Hãng.</li>
                    <li>Sản phẩm lắp đặt, bảo trì, sử dụng không đúng theo hướng dẫn của Nhà sản xuất gây ra hư hỏng.
                    </li>
                </ul>

                <p>Lưu ý:</p>

                <ul className={"list-disc px-8 flex flex-col gap-2"}>
                    <li>Chương trình bảo hành bắt đầu có hiệu lực từ thời điểm <strong>hieutn.dev</strong> xuất hóa đơn
                        cho Quý khách.
                    </li>
                    <li>Với mỗi dòng sản phẩm khác nhau sẽ có chính sách bảo hành khác nhau tùy theo chính sách của
                        Hãng/Nhà
                        cung cấp.
                    </li>

                    <li>Để tìm hiểu thông tin chi tiết về chính sách bảo hành cho sản phẩm cụ thể, xin liên hệ bộ phận
                        Chăm
                        sóc Khách hàng
                    </li>

                    <li>Trong quá trình thực hiện dịch vụ bảo hành, các nội dung lưu trữ trên sản phẩm của Quý khách sẽ
                        bị
                        xóa và định dạng lại. Do đó, Quý khách vui lòng tự sao lưu toàn bộ dữ liệu trong sản phẩm, đồng
                        thời
                        gỡ
                        bỏ tất cả các thông tin cá nhân mà Quý khách muốn bảo mật. <strong>hieutn.dev</strong> không
                        chịu trách nhiệm đối
                        với
                        bất
                        kỳ mất mát nào liên quan tới các chương trình phần mềm, dữ liệu hoặc thông tin nào khác lưu trữ
                        trên
                        sản phẩm bảo hành.
                    </li>

                    <li>Vui lòng tắt tất cả các mật khẩu bảo vệ, <strong>hieutn.dev</strong> sẽ từ chối tiếp nhận bảo
                        hành nếu thiết bị của
                        bạn bị khóa bởi bất cứ phương pháp nào.
                    </li>
                </ul>


            </div>
        </section>
    );
}

export default WarrantyPolicy;