import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classConfig from "../../utils/config/class.config.js";

PrivatePolicy.propTypes = {};

function PrivatePolicy(props) {
    return (
        <section className={"flex flex-col gap-4"}>
            <h1 className={classNames(classConfig.fontSize.h4, classConfig.textColor.default)}>
                Chính sách bảo mật
            </h1>
            <div className={"flex flex-col gap-4 text-xl"}>
                <p className={"font-semibold"}>1. Mục đích và phạm vi thu thập thông tin</p>
                <p>Chúng tôi thu thập thông tin từ bạn khi bạn đặt hàng trên trang web hoặc liên hệ email, điện thoại
                    với chúng tôi. Bất kỳ thông tin chúng tôi thu thập từ bạn có thể được sử dụng một trong những cách
                    sau đây:
                </p>
                <ul className={"list-disc px-8 flex flex-col gap-2"}>
                    <li>Để cải thiện trang web của chúng tôi (Chúng tôi liên tục cố gắng để cải thiện các dịch vụ trang
                        web
                        của chúng tôi dựa trên các thông tin và phản hồi chúng tôi nhận được từ bạn)
                    </li>
                    <li>Để cải thiện dịch vụ khách hàng (Thông tin của bạn sẽ giúp chúng tôi đáp ứng hiệu quả hơn yêu
                        cầu
                        dịch
                        vụ khách hàng và nhu cầu hỗ trợ của bạn)
                    </li>
                    <li>Để xử lý các giao dịch</li>
                    <li>Địa chỉ email mà bạn cung cấp khi xử lý đơn hàng, có thể được sử dụng để gửi cho bạn thông tin
                        và
                        cập nhật liên quan đến đặt hàng của bạn, ngoài việc tiếp nhận tin tức thường xuyên, cập nhật,
                        sản
                        phẩm hoặc dịch vụ liên quan đến thông tin
                    </li>
                </ul>


                <p className={"font-semibold"}>2. Phạm vi sử dụng thông tin</p>

                <p><strong>hieutn.dev</strong> sử dụng thông tin khách hàng trong trường hợp thông báo đơn hàng đến với
                    khách hàng.
                    Không sử dụng thông tin khách hàng cho các mục đích khác mà chưa được sự đồng ý của khách hàng.</p>

                <p className={"font-semibold"}>3. Thời gian lưu trữ thông tin</p>

                <p><strong>hieutn.dev</strong> lưu trữ thông tin khách hàng, đơn hàng nhằm để đối chiếu khi có phát sinh
                    vấn đề xảy ra,
                    không lưu trữ thông tin khác, nhạy cảm của khách hàng như số điện thoại, thông tin địa
                    chỉ..v.v..</p>

                <p className={"font-semibold"}>4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</p>
                <ul className={"list-disc px-8 flex flex-col gap-2"}>
                    <li><strong>hieutn.dev</strong> lưu trữ thông tin khách hàng thông qua việc khách hàng email đặt
                        hàng, không yêu
                        cầu
                        khách hàng phải để lại thông tin nếu chưa được sự đồng ý.
                    </li>
                </ul>

                <p className={"font-semibold"}>5. Phương tiện và công cụ để người dùng tiếp cận và điều chỉnh</p>
                <p>Khách hàng hoàn toàn có thể yêu cầu <strong>hieutn.dev</strong> cung cấp hoặc xóa bỏ thông tin của
                    chính mình
                    nếu có
                    nhu cầu, <strong>hieutn.dev</strong> hoàn toàn không sử dụng hoặc chỉnh sửa thông tin khách hàng.
                </p>

                <p className={"font-semibold"}>6. Cam kết bảo mật thông tin cá nhân khách hàng</p>
                <ul className={"list-disc px-8 flex flex-col gap-2"}>
                    <li>Thông tin của bạn, dù công hay tư, sẽ không được bán, trao đổi, chuyển nhượng, hoặc để lộ
                        cho
                        bất kỳ
                        công ty khác cho bất kỳ lý do nào, mà không có sự đồng ý của bạn
                    </li>
                    <li>
                        Tất cả các thông tin nhạy cảm chỉ có thể truy cập bởi những người được ủy quyền có quyền
                        truy
                        cập và
                        được yêu cầu để giữ cho các thông tin bí mật.
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default PrivatePolicy;