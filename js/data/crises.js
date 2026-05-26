/* Data-driven crisis deck. Writers can add cards without touching game flow. */

const CARDS = [
  {
    id: 1,
    category: 'GIAI CẤP',
    bg: 'office',
    title: 'Đình Công Toàn Quốc Của Công Nhân',
    desc: 'Hàng trăm nghìn công nhân nhà máy đồng loạt <span class="hl-bad">đình công</span>, yêu cầu <span class="hl-good">tăng lương tối thiểu</span> và cải thiện điều kiện làm việc. Cổng xưởng bị phong tỏa. Thiệt hại kinh tế tăng từng giờ.',
    advisor: 'lan',
    advisorLine: 'Thưa Thủ tướng, lực lượng lao động đang rất bức xúc. Tiền lương thực tế không tăng đã 3 năm trong khi lợi nhuận doanh nghiệp tăng trưởng mạnh. Đây là khủng hoảng xã hội nghiêm trọng.',
    options: [
      { label: 'A', title: 'Đàm phán - Tăng lương tối thiểu 15%', desc: 'Mời đại diện công đoàn vào bàn đàm phán. Cam kết tăng lương theo lộ trình rõ ràng.', effects: { congnhan: 20, tuban: -15, nganSach: -10 }, consequence: 'Công nhân hoan nghênh, nhà máy hoạt động trở lại sau 3 ngày. Giới doanh nghiệp lo ngại về chi phí lao động tăng nhưng tình hình ổn định.' },
      { label: 'B', title: 'Cứng rắn - Huy động cảnh sát giải tán', desc: 'Ban bố lệnh giải tán, huy động lực lượng an ninh bảo vệ trật tự sản xuất.', effects: { congnhan: -25, tuban: 10, onDinhCT: -20 }, consequence: 'Đình công bị dập tắt. Hình ảnh quốc tế xấu đi nghiêm trọng. Phong trào lao động âm ỉ, bạo lực tiềm ẩn gia tăng.' },
      { label: 'C', title: 'Trì hoãn - Lập ủy ban điều tra 6 tháng', desc: 'Thành lập ủy ban liên ngành nghiên cứu vấn đề lao động. Kêu gọi bình tĩnh.', effects: { congnhan: -5, tuban: -5 }, consequence: 'Cả hai phía đều thất vọng. Đình công tiếp tục với quy mô nhỏ hơn. Uy tín lãnh đạo bị tổn hại nhẹ.' }
    ]
  },
  {
    id: 2,
    category: 'GIAI CẤP',
    bg: 'office',
    title: 'Tập Đoàn Lớn Trốn Thuế Bị Phanh Phui',
    desc: 'Báo chí điều tra phát hiện một tập đoàn đa quốc gia <span class="hl-bad">trốn thuế hơn 2.000 tỷ đồng</span> trong 5 năm thông qua mạng lưới công ty vỏ bọc. Công chúng đang phẫn nộ.',
    advisor: 'minh',
    advisorLine: 'Thưa Thủ tướng, bằng chứng rất rõ ràng. Nhưng tập đoàn này tạo ra 50.000 việc làm và đóng vai trò lớn trong chuỗi cung ứng xuất khẩu. Chúng ta phải cân nhắc hậu quả kinh tế.',
    options: [
      { label: 'A', title: 'Truy tố công khai - Xét xử toàn bộ', desc: 'Khởi tố hình sự, thu hồi toàn bộ thuế thất thoát, truy cứu trách nhiệm lãnh đạo.', effects: { tuban: -20, triThuc: 15, congnhan: 10, nganSach: 20 }, consequence: 'Công chúng hoan nghênh. Một số nhà đầu tư nước ngoài lo ngại, nhưng niềm tin vào hệ thống pháp luật được củng cố.' },
      { label: 'B', title: 'Dàn xếp kín - Nộp phạt không truy tố', desc: 'Đàm phán bí mật: tập đoàn nộp 60% tiền thuế trốn, tiếp tục hoạt động bình thường.', effects: { tuban: 10, triThuc: -20, nganSach: 10, onDinhCT: -10 }, consequence: 'Tin tức rò rỉ. Truyền thông chỉ trích nặng nề. Tập đoàn sống sót nhưng uy tín Thủ tướng bị tổn hại nghiêm trọng.' },
      { label: 'C', title: 'Phạt hành chính - Thỏa hiệp có điều kiện', desc: 'Phạt 100% số thuế trốn, yêu cầu tái cơ cấu nội bộ, không truy tố hình sự.', effects: { tuban: -5, triThuc: -8, nganSach: 15 }, consequence: 'Phương án dung hòa. Không ai hoàn toàn hài lòng, nhưng không có phản ứng dữ dội. Tiền về ngân sách.' }
    ]
  },
  {
    id: 3,
    category: 'GIAI CẤP',
    bg: 'parliament',
    title: 'Bất Bình Đẳng Thu Nhập Lên Mức Kỷ Lục',
    desc: 'Báo cáo mới nhất: <span class="hl-bad">hệ số Gini đạt 0.45</span> - mức cao nhất trong 20 năm. Top 10% giàu nhất sở hữu <span class="hl-bad">65% tổng tài sản</span> quốc gia.',
    advisor: 'lan',
    advisorLine: 'Đây là vấn đề cấu trúc, thưa Thủ tướng. Không có giải pháp ngắn hạn nào giải quyết triệt để. Nhưng chúng ta phải hành động để cho thấy chính phủ có lập trường.',
    options: [
      { label: 'A', title: 'Thuế lũy tiến mạnh - Đánh thuế tài sản', desc: 'Áp thuế lũy tiến 35% cho thu nhập rất cao. Thuế tài sản với bất động sản thứ hai trở lên.', effects: { congnhan: 15, nongdan: 10, tuban: -20, tangTruong: -0.8 }, consequence: 'Giới lao động và nông dân hoan nghênh. Doanh nghiệp cảnh báo vốn chảy ra nước ngoài. Tăng trưởng ngắn hạn bị ảnh hưởng nhẹ.' },
      { label: 'B', title: 'Trợ cấp có chọn lọc - Mạng lưới an sinh', desc: 'Tăng ngân sách trợ cấp xã hội 20%, tập trung vào 20% hộ nghèo nhất.', effects: { congnhan: 10, nongdan: 8, danToc: 8, nganSach: -18 }, consequence: 'Tác động ngay tới người dân nghèo. Chi ngân sách lớn nhưng chưa xử lý nguyên nhân gốc rễ.' },
      { label: 'C', title: 'Ủy ban chuyên gia - Nghiên cứu chính sách', desc: 'Mời chuyên gia quốc tế, lập ủy ban tư vấn chính sách phân phối thu nhập.', effects: { triThuc: 10, congnhan: -5, nongdan: -5 }, consequence: 'Trí thức đánh giá cao tính chuyên môn. Người dân thất vọng vì không có hành động cụ thể.' }
    ]
  },
  {
    id: 4,
    category: 'GIAI CẤP',
    bg: 'protest',
    title: 'Phong Trào "Chiếm Phố Wall" Nội Địa',
    desc: 'Hàng nghìn người biểu tình bao vây khu tài chính trung tâm, yêu cầu <span class="hl">cải cách hệ thống ngân hàng</span> và tái phân phối tài sản. Phong trào đã kéo dài 2 tuần.',
    advisor: 'cuong',
    advisorLine: 'Thưa Thủ tướng, lực lượng an ninh đang cảnh giác cao. Tôi lo ngại phần tử cực đoan có thể kích động bạo lực. Cần phán quyết rõ ràng về cách xử lý.',
    options: [
      { label: 'A', title: 'Đối thoại công khai - Trực tiếp lắng nghe', desc: 'Tổ chức đối thoại trực tiếp với đại diện phong trào. Cam kết xem xét cải cách.', effects: { triThuc: 18, congnhan: 12, tuban: -15, onDinhCT: -8 }, consequence: 'Phong trào dịu lại sau cuộc đối thoại. Cổ phiếu ngân hàng giảm nhẹ. Uy tín Thủ tướng được củng cố trong giới trẻ.' },
      { label: 'B', title: 'Giải tán bằng vũ lực - Bảo vệ trật tự', desc: 'Ban lệnh giải tán khẩn cấp, huy động đơn vị chống bạo động giải tán toàn bộ.', effects: { tuban: 8, onDinhCT: -28, congnhan: -22, triThuc: -15 }, consequence: 'Hình ảnh đàn áp lan nhanh trên mạng quốc tế. Biểu tình tiếp tục ở các thành phố khác. Nguy cơ leo thang nghiêm trọng.' },
      { label: 'C', title: 'Tuyên bố điều tra - Hứa cải cách', desc: 'Tuyên bố Chính phủ cam kết xem xét cải cách hệ thống tài chính trong năm tới.', effects: { congnhan: 5, triThuc: 5, tuban: -5 }, consequence: 'Phong trào tạm lắng. Nhưng nếu cải cách không đến, làn sóng thứ hai sẽ mạnh hơn.' }
    ]
  },
  {
    id: 5,
    category: 'DÂN TỘC',
    bg: 'village',
    title: 'Dân Tộc Thiểu Số Đòi Dạy Tiếng Mẹ Đẻ',
    desc: 'Liên minh 15 dân tộc thiểu số đệ đơn lên Quốc hội yêu cầu được <span class="hl">dạy ngôn ngữ dân tộc</span> trong trường tiểu học vùng cao. Số người ký tên <span class="hl-good">vượt 500.000</span>.',
    advisor: 'son',
    advisorLine: 'Thưa Thủ tướng, đây là quyền văn hóa cơ bản. Nhưng nếu thiết kế kém, chính sách có thể thành biểu tượng rỗng. Cộng đồng muốn được tham gia xây chương trình, không chỉ nhận quyết định từ trung ương.',
    options: [
      { label: 'A', title: 'Chính thức hóa song ngữ toàn quốc', desc: 'Dạy song ngữ tại vùng dân tộc từ lớp 1-3, nhà nước tài trợ đào tạo giáo viên.', effects: { danToc: 28, triThuc: 10, nganSach: -12 }, consequence: 'Cộng đồng dân tộc thiểu số hân hoan. Được quốc tế khen ngợi. Chi phí ngân sách tăng nhưng được coi là đầu tư vào hòa hợp xã hội.' },
      { label: 'B', title: 'Từ chối - Ưu tiên thống nhất ngôn ngữ', desc: 'Duy trì một ngôn ngữ giảng dạy chính thức trong hệ thống giáo dục quốc gia.', effects: { danToc: -32, onDinhCT: -15, triThuc: -10 }, consequence: 'Cộng đồng dân tộc thiểu số cảm thấy bị phân biệt đối xử. Căng thẳng vùng núi tăng cao. Một số tổ chức quốc tế chỉ trích.' },
      { label: 'C', title: 'Thí điểm - 5 tỉnh trong 3 năm', desc: 'Cho phép thí điểm tại 5 tỉnh có dân số dân tộc thiểu số cao nhất. Đánh giá sau 3 năm.', effects: { danToc: 14, triThuc: 6, nganSach: -5 }, consequence: 'Giải pháp thực dụng được chấp nhận ở mức vừa phải. Cộng đồng muốn hơn nhưng chấp nhận như bước đầu tiên.' }
    ]
  },
  {
    id: 6,
    category: 'DÂN TỘC',
    bg: 'village',
    title: 'Xung Đột Đất Đai Tây Nguyên Leo Thang',
    desc: '<span class="hl-bad">Tranh chấp đất rừng</span> giữa cộng đồng bản địa và doanh nghiệp trồng cà phê lớn bùng phát thành <span class="hl-bad">xung đột vũ trang nhỏ</span>. Đã có người bị thương.',
    advisor: 'son',
    advisorLine: 'Đây là đất canh tác đã gắn bó với các tộc người hàng trăm năm. Nhưng doanh nghiệp có giấy phép hợp lệ từ chính phủ trước đây. Bất kỳ quyết định nào cũng tạo tiền lệ pháp lý.',
    options: [
      { label: 'A', title: 'Trả đất - Tái định cư doanh nghiệp', desc: 'Thu hồi giấy phép vi phạm, trả lại đất truyền thống, bồi thường doanh nghiệp bằng đất khác.', effects: { danToc: 22, nongdan: 8, tuban: -18, nganSach: -20 }, consequence: 'Cộng đồng bản địa tin tưởng vào chính phủ. Một số doanh nghiệp kiện ra tòa. Quốc tế đánh giá cao việc bảo vệ quyền bản địa.' },
      { label: 'B', title: 'Duy trì hiện trạng - Tăng cường an ninh', desc: 'Xem đây là vấn đề an ninh trật tự, triển khai lực lượng ổn định vùng.', effects: { danToc: -22, tuban: 6, onDinhCT: -12 }, consequence: 'Xung đột tạm lắng nhưng nguyên nhân gốc rễ không được giải quyết. Căng thẳng âm ỉ tiếp diễn.' },
      { label: 'C', title: 'Trọng tài độc lập - Hội đồng hòa giải', desc: 'Hội đồng gồm chuyên gia luật đất đai, đại diện hai bên và trọng tài độc lập.', effects: { danToc: 8, nongdan: 5, triThuc: 12, nganSach: -8 }, consequence: 'Quá trình lâu dài nhưng được cả hai bên chấp nhận. Được coi là tiền lệ tốt cho các tranh chấp tương tự.' }
    ]
  },
  {
    id: 7,
    category: 'DÂN TỘC',
    bg: 'protest',
    title: 'Làn Sóng Kỳ Thị Người Nhập Cư',
    desc: 'Loạt vụ <span class="hl-bad">tấn công nhắm vào người lao động nhập cư</span> tại các khu công nghiệp. Tổng lãnh sự quán yêu cầu giải thích. Cộng đồng nhập cư biểu tình đòi bảo vệ.',
    advisor: 'lan',
    advisorLine: 'Thưa Thủ tướng, đây không chỉ là vấn đề an ninh mà còn là bài kiểm tra về giá trị của chúng ta. Người nhập cư đóng góp lớn cho kinh tế nhưng chưa được bảo vệ đầy đủ.',
    options: [
      { label: 'A', title: 'Luật chống phân biệt đối xử mạnh mẽ', desc: 'Thông qua luật chống kỳ thị. Truy tố hình sự các vụ tấn công. Tăng ngân sách hội nhập.', effects: { triThuc: 16, danToc: 22, tuban: -6, onDinhCT: -5 }, consequence: 'Cộng đồng nhập cư và xã hội dân sự đánh giá cao. Một bộ phận dân chúng phản ứng nhưng đây là quan điểm thiểu số.' },
      { label: 'B', title: 'Hạn chế nhập cư - Bảo vệ việc làm nội địa', desc: 'Siết quy định lao động nhập cư, tăng phí, ưu tiên tuyển dụng lao động địa phương.', effects: { tuban: 5, nongdan: 5, danToc: -28, triThuc: -12 }, consequence: 'Phản ứng rộng rãi từ quốc tế và tổ chức nhân quyền. Gây khó khăn cho quan hệ ngoại giao với nước láng giềng.' },
      { label: 'C', title: 'Chiến dịch truyền thông - Thay đổi nhận thức', desc: 'Phát động chiến dịch giáo dục công dân về đóng góp của người nhập cư.', effects: { triThuc: 10, danToc: 10, nganSach: -8 }, consequence: 'Hiệu quả trong dài hạn nhưng chậm. Không giải quyết ngay vấn đề an toàn cho cộng đồng nhập cư.' }
    ]
  },
  {
    id: 8,
    category: 'DÂN TỘC',
    bg: 'village',
    title: 'Lễ Hội Truyền Thống Bị Thương Mại Hóa',
    desc: 'Một tập đoàn du lịch lớn <span class="hl">mua bản quyền thương hiệu lễ hội</span>, tổ chức phiên bản thương mại gây tranh cãi. Cộng đồng bản địa tố bị đánh cắp văn hóa.',
    advisor: 'son',
    advisorLine: 'Ranh giới giữa chia sẻ văn hóa và chiếm đoạt văn hóa đang bị mờ nhạt. Vụ việc này tạo tiền lệ quan trọng cho hàng trăm lễ hội truyền thống khác.',
    options: [
      { label: 'A', title: 'Bảo vệ di sản - Thu hồi bản quyền thương mại', desc: 'Tuyên bố lễ hội là di sản văn hóa phi vật thể được bảo vệ. Cộng đồng được quyền kiểm soát.', effects: { danToc: 16, triThuc: 12, tuban: -12 }, consequence: 'UNESCO đánh giá cao. Tập đoàn du lịch mất hợp đồng nhưng cộng đồng được trao quyền. Mô hình có thể nhân rộng.' },
      { label: 'B', title: 'Ủng hộ thương mại hóa - Tăng trưởng du lịch', desc: 'Coi đây là cơ hội quảng bá văn hóa, yêu cầu chia sẻ doanh thu với cộng đồng 20%.', effects: { tuban: 16, nganSach: 6, danToc: -16, triThuc: -10 }, consequence: 'Doanh thu du lịch tăng. Nhưng cộng đồng bản địa cảm thấy bị bán rẻ. Tranh cãi tiếp tục trên mạng xã hội.' },
      { label: 'C', title: 'Quy định khung - Chia sẻ lợi ích bắt buộc', desc: 'Thương mại hóa văn hóa phải có sự đồng ý cộng đồng và chia sẻ 40% doanh thu.', effects: { triThuc: 7, danToc: 8, tuban: 5, nganSach: -4 }, consequence: 'Giải pháp cân bằng được hầu hết các bên chấp nhận. Tạo tiền lệ pháp lý quan trọng.' }
    ]
  },
  {
    id: 9,
    category: 'LỢI ÍCH ĐAN XEN',
    bg: 'factory',
    title: 'FDI Muốn Xây KCN Trên Đất Nông Nghiệp',
    desc: 'Một tập đoàn bán dẫn đề nghị <span class="hl-good">đầu tư 5 tỷ USD</span>, yêu cầu <span class="hl-bad">3.000 ha đất nông nghiệp</span> màu mỡ vùng đồng bằng sông Cửu Long.',
    advisor: 'minh',
    advisorLine: 'Thưa Thủ tướng, 5 tỷ USD và 50.000 việc làm kỹ thuật cao là cơ hội hiếm. Nhưng 3.000 ha đất là sinh kế của 15.000 hộ nông dân. Đây là quyết định thế hệ.',
    options: [
      { label: 'A', title: 'Chấp thuận toàn bộ - Ưu tiên công nghiệp hóa', desc: 'Cấp đất, hỗ trợ giải phóng mặt bằng nhanh, ưu đãi thuế 10 năm.', effects: { tuban: 22, tangTruong: 1.5, nongdan: -28, danToc: -10, nganSach: 15 }, consequence: 'GDP tăng đột biến. Nhưng 15.000 hộ nông dân mất sinh kế. Tranh chấp đất đai kéo dài nhiều năm.' },
      { label: 'B', title: 'Từ chối - Bảo vệ nông nghiệp và nông dân', desc: 'Từ chối dự án, đề xuất vị trí thay thế là đất kém màu mỡ tại vùng trung du.', effects: { nongdan: 22, danToc: 10, tuban: -16, tangTruong: -0.5 }, consequence: 'Nông dân và cộng đồng địa phương ủng hộ. Tập đoàn nước ngoài chuyển sang nước khác. Bỏ lỡ cơ hội đầu tư lớn.' },
      { label: 'C', title: 'Đàm phán lại - Chia sẻ địa điểm và lợi ích', desc: 'Chỉ cấp 800 ha, yêu cầu đào tạo lại nghề cho nông dân bị ảnh hưởng, chia sẻ hạ tầng.', effects: { tuban: 10, nongdan: 5, tangTruong: 0.5, nganSach: 8 }, consequence: 'Thỏa thuận nhỏ hơn nhưng bền vững hơn. Tập đoàn ít hài lòng nhưng vẫn ký. Nông dân được bồi thường và có việc làm mới.' }
    ]
  },
  {
    id: 10,
    category: 'LỢI ÍCH ĐAN XEN',
    bg: 'cyber',
    title: 'AI Thay Thế 30% Việc Làm Văn Phòng',
    desc: 'Bộ Lao Động cảnh báo <span class="hl-bad">2,4 triệu việc làm</span> hành chính, kế toán, dịch vụ khách hàng có thể bị <span class="hl">thay thế bởi AI</span> trong 3 năm tới.',
    advisor: 'huy',
    advisorLine: 'Thưa Thủ tướng, đây không chỉ là vấn đề kinh tế mà còn là vấn đề chính trị nóng nhất hiện nay. Mạng xã hội đang sôi sục. Báo chí đang chờ phản ứng của Chính phủ.',
    options: [
      { label: 'A', title: 'Thuế AI - Quỹ tái đào tạo quốc gia', desc: 'Đánh thuế 5% doanh thu từ AI. Lập quỹ tái đào tạo lao động bị thay thế.', effects: { triThuc: 15, congnhan: 12, tuban: -16, tangTruong: -0.5 }, consequence: 'Được lực lượng lao động đánh giá cao. Doanh nghiệp phàn nàn về chi phí nhưng chấp nhận. Quỹ tái đào tạo khởi đầu chậm.' },
      { label: 'B', title: 'Chào đón đổi mới - Không can thiệp thị trường', desc: 'Ủng hộ chuyển đổi số, để thị trường điều chỉnh. Giảm thuế cho doanh nghiệp AI.', effects: { tuban: 20, triThuc: 8, congnhan: -22, tangTruong: 1 }, consequence: 'Đầu tư AI tăng mạnh. Nhưng hàng triệu lao động bị bỏ lại. Bất bình đẳng gia tăng nhanh. Nguy cơ bất ổn xã hội.' },
      { label: 'C', title: 'Lệnh tạm dừng - Nghiên cứu tác động 2 năm', desc: 'Yêu cầu báo cáo tác động AI, tạm dừng sa thải hàng loạt trong 2 năm.', effects: { congnhan: 10, tuban: -10, triThuc: -5 }, consequence: 'Lực lượng lao động tạm an tâm. Doanh nghiệp lo ngại mất tính cạnh tranh. Biện pháp trì hoãn, không giải quyết gốc rễ.' }
    ]
  },
  {
    id: 11,
    category: 'LỢI ÍCH ĐAN XEN',
    bg: 'village',
    title: 'Biến Đổi Khí Hậu: Nông Dân vs Công Nghiệp',
    desc: '<span class="hl-bad">Hạn hán nghiêm trọng nhất 50 năm</span> tàn phá vùng đồng bằng. Nông dân yêu cầu đóng cửa các nhà máy xả thải làm ô nhiễm nguồn nước.',
    advisor: 'mai',
    advisorLine: 'Khoa học cho thấy 40% nguồn nước bị ảnh hưởng trực tiếp bởi xả thải công nghiệp. Nhưng 120.000 việc làm đang phụ thuộc vào các nhà máy này. Không có lựa chọn dễ dàng.',
    options: [
      { label: 'A', title: 'Ưu tiên môi trường - Đóng cửa cơ sở vi phạm', desc: 'Đình chỉ ngay 23 nhà máy vi phạm nặng. Lập quỹ phục hồi môi trường từ tiền phạt.', effects: { nongdan: 16, danToc: 10, triThuc: 14, tuban: -22, tangTruong: -0.5 }, consequence: 'Hành động mạnh mẽ được quốc tế đánh giá cao. Nhà máy đóng cửa nhưng môi trường bắt đầu phục hồi. Công nhân bị ảnh hưởng.' },
      { label: 'B', title: 'Ưu tiên công nghiệp - Cân bằng tăng trưởng', desc: 'Chỉ đình chỉ 3 trường hợp nghiêm trọng nhất. Cho thời gian 3 năm nâng cấp công nghệ.', effects: { tuban: 14, tangTruong: 0.8, nongdan: -22, danToc: -10 }, consequence: 'Doanh nghiệp tiếp tục hoạt động. Hạn hán kéo dài. Nông dân tiếp tục thiệt hại. Tổ chức môi trường quốc tế chỉ trích nặng nề.' },
      { label: 'C', title: 'Đánh đổi cân bằng - Lộ trình 18 tháng', desc: 'Buộc tất cả nhà máy nộp kế hoạch xử lý nước thải và hoàn thành trong 18 tháng.', effects: { nongdan: 5, tuban: 5, triThuc: 5, nganSach: -12 }, consequence: 'Không ai hoàn toàn hài lòng nhưng không ai bị tổn hại nặng. Giải pháp kỹ thuật dần khả thi.' }
    ]
  },
  {
    id: 12,
    category: 'LỢI ÍCH ĐAN XEN',
    bg: 'parliament',
    title: 'Bầu Cử - Ai Tài Trợ Chiến Dịch Của Bạn?',
    desc: 'Năm bầu cử. Chiến dịch tranh cử <span class="hl">cần tới 500 tỷ đồng</span>. Ba nguồn tài trợ lớn đang chờ câu trả lời, mỗi nguồn đi kèm <span class="hl-bad">điều kiện ngầm</span>.',
    advisor: 'huy',
    advisorLine: 'Thưa Thủ tướng, đây là quyết định tài chính nhưng cũng là quyết định chính trị sâu xa nhất. Tiền từ đâu thì quyền lực phục vụ ai - cử tri hiểu điều này.',
    options: [
      { label: 'A', title: 'Từ chối doanh nghiệp - Huy động cộng đồng', desc: 'Chỉ nhận đóng góp cá nhân tối đa 10 triệu/người. Chiến dịch crowdfunding minh bạch.', effects: { congnhan: 16, triThuc: 22, tuban: -22, nganSach: -10 }, consequence: 'Uy tín liêm chính tăng mạnh. Chiến dịch khó khăn về tài chính nhưng được lòng dân. Giới trẻ và trí thức nhiệt liệt ủng hộ.' },
      { label: 'B', title: 'Chấp nhận tài trợ doanh nghiệp lớn', desc: 'Nhận tài trợ từ liên minh doanh nghiệp, đổi lại cam kết môi trường kinh doanh thuận lợi.', effects: { tuban: 22, nganSach: 16, triThuc: -22, onDinhCT: -10 }, consequence: 'Chiến dịch có đủ kinh phí. Nhưng thông tin rò rỉ về các cam kết ngầm. Cuộc điều tra báo chí bắt đầu.' },
      { label: 'C', title: 'Quỹ công - Tài trợ từ ngân sách nhà nước', desc: 'Đề xuất cơ chế tài trợ bầu cử từ ngân sách, mỗi đảng được cấp bình đẳng.', effects: { triThuc: 16, congnhan: 10, nongdan: 5, nganSach: -22 }, consequence: 'Cải cách hệ thống bầu cử được hoan nghênh. Chi ngân sách lớn nhưng tạo tiền lệ minh bạch lâu dài.' }
    ]
  },
  {
    id: 13,
    category: 'Y TẾ - CỘNG ĐỒNG',
    bg: 'hospital',
    title: 'Dịch Bệnh Lạ Bùng Phát Tại Thủ Đô',
    desc: 'Một loại <span class="hl-bad">virus hô hấp mới</span> đang lây lan nhanh. Bệnh viện <span class="hl-bad">quá tải</span>. Tổ chức y tế khuyến cáo phong tỏa, nhưng giới doanh nghiệp cảnh báo kinh tế sẽ sụp đổ.',
    advisor: 'lan',
    advisorLine: 'Thưa Thủ tướng, sinh mạng người dân là trên hết. Nếu không hành động ngay, hệ thống y tế sẽ vỡ trận trong 2 tuần tới. Chúng ta không thể đánh cược với sức khỏe cộng đồng.',
    options: [
      { label: 'A', title: 'Phong tỏa toàn diện 14 ngày', desc: 'Dừng mọi hoạt động không thiết yếu, thiết lập vùng cách ly nghiêm ngặt.', effects: { triThuc: 15, congnhan: 10, tuban: -25, tangTruong: -2, nganSach: -15 }, consequence: 'Kiểm soát được dịch bệnh, nhưng kinh tế chịu đòn giáng mạnh. Người lao động tự do gặp khó khăn nhưng đánh giá cao sự quyết liệt.' },
      { label: 'B', title: 'Phong tỏa cục bộ - Vừa chống dịch vừa làm', desc: 'Chỉ phong tỏa ổ dịch hẹp, yêu cầu đeo khẩu trang và giãn cách nơi làm việc.', effects: { tuban: 10, tangTruong: -0.5, triThuc: -15, onDinhCT: -10 }, consequence: 'Kinh tế vẫn duy trì được, nhưng số ca nhiễm tăng cao khiến công chúng hoang mang. Giới khoa học chỉ trích chính phủ nửa vời.' },
      { label: 'C', title: 'Không phong tỏa - Bơm tiền cho y tế', desc: 'Giữ nền kinh tế mở, dùng ngân sách mua khẩn cấp trang thiết bị và thuốc điều trị.', effects: { tuban: 20, tangTruong: 1, nganSach: -25, congnhan: -15 }, consequence: 'Giới đầu tư thở phào. Tuy nhiên, ngân sách thâm hụt nặng và hình ảnh bệnh viện quá tải làm giảm sút uy tín nghiêm trọng.' }
    ]
  },
  {
    id: 14,
    category: 'CÔNG NGHỆ - AN NINH',
    bg: 'cyber',
    title: 'Video Deepfake Chống Phá Chính Phủ',
    desc: 'Một <span class="hl-bad">video giả mạo bằng AI</span> chiếu cảnh Thủ tướng nhận hối lộ đang lan truyền chóng mặt. Dù là giả, nó châm ngòi cho các cuộc <span class="hl-bad">biểu tình nhỏ</span>.',
    advisor: 'cuong',
    advisorLine: 'Video này được dàn dựng bằng AI cấp độ cao. Nó đang được đẩy bởi một mạng lưới bot nước ngoài. Mạng xã hội đang mất kiểm soát, chúng ta cần hành động rõ ràng.',
    options: [
      { label: 'A', title: 'Chặn nền tảng mạng xã hội 48 giờ', desc: 'Ra lệnh nhà mạng chặn truy cập nền tảng để ngăn đà lan truyền, câu giờ điều tra.', effects: { onDinhCT: 15, triThuc: -25, tuban: -15, tangTruong: -1 }, consequence: 'Video bị dập tắt, an ninh được bảo đảm. Nhưng giới trí thức và quốc tế lên án mạnh mẽ việc bóp nghẹt tự do ngôn luận.' },
      { label: 'B', title: 'Công bố sự thật - Họp báo khẩn', desc: 'Mời chuyên gia công nghệ độc lập phân tích công khai, bóc trần sự thật trước toàn dân.', effects: { triThuc: 20, congnhan: 10, nganSach: -5, onDinhCT: -5 }, consequence: 'Xóa bỏ được hiểu lầm. Sự minh bạch ghi điểm lớn với trí thức. Dù vậy, một bộ phận nhỏ vẫn tin vào thuyết âm mưu.' },
      { label: 'C', title: 'Lập tường lửa quốc gia bằng luật mới', desc: 'Tranh thủ khủng hoảng, yêu cầu Quốc hội thông qua luật kiểm duyệt internet nghiêm ngặt.', effects: { onDinhCT: 20, danToc: -10, triThuc: -30, tuban: -10 }, consequence: 'Nhà nước nắm quyền kiểm soát thông tin dài hạn. Đổi lại, làn sóng chảy máu chất xám bắt đầu. Lòng tin của giới trẻ chạm đáy.' }
    ]
  },
  {
    id: 15,
    category: 'GIÁO DỤC',
    bg: 'classroom',
    title: 'Bê Bối Rò Rỉ Đề Thi Quốc Gia',
    desc: 'Đề thi tốt nghiệp <span class="hl-bad">bị bán công khai</span> trên nhóm kín. Hàng triệu phụ huynh và học sinh phẫn nộ, tập trung trước Bộ Giáo dục đòi <span class="hl-bad">hủy kết quả</span>.',
    advisor: 'huy',
    advisorLine: 'Báo chí quốc tế đã bắt đầu đưa tin. Niềm tin vào hệ thống giáo dục đang sụp đổ. Thủ tướng cần một giải pháp cực kỳ thuyết phục để hạ nhiệt dư luận.',
    options: [
      { label: 'A', title: 'Hủy kết quả - Tổ chức thi lại toàn quốc', desc: 'Tuyên bố vô hiệu hóa kỳ thi vừa qua. Bơm ngân sách để tổ chức lại trong 1 tháng tới.', effects: { triThuc: 15, congnhan: 10, nganSach: -20, onDinhCT: -10 }, consequence: 'Bảo vệ được sự công bằng nhưng chi phí cực kỳ đắt đỏ. Sự mệt mỏi của học sinh gây ra một số bất mãn trong xã hội.' },
      { label: 'B', title: 'Cách chức Bộ trưởng - Giữ nguyên kết quả', desc: 'Trảm tướng để xoa dịu dư luận. Bắt kẻ tuồn đề nhưng không tổ chức thi lại để tiết kiệm.', effects: { congnhan: -15, nongdan: -10, onDinhCT: 10 }, consequence: 'Máu đã đổ trên chính trường, báo chí hả hê. Nhưng hàng nghìn học sinh nghèo cảm thấy bị cướp mất tương lai vì sự bất công không được sửa chữa.' },
      { label: 'C', title: 'Chuyển quyền xét tuyển cho các trường', desc: 'Bỏ kết quả thi chung, cho phép đại học tự tổ chức xét tuyển riêng ngay lập tức.', effects: { tuban: 10, triThuc: -10, nongdan: -20 }, consequence: 'Các trường đại học tư thục và đô thị thích cơ chế này. Nhưng học sinh nông thôn và dân tộc thiểu số mất lợi thế cạnh tranh.' }
    ]
  },
  {
    id: 16,
    category: 'NGOẠI GIAO - KINH TẾ',
    bg: 'diplomacy',
    title: 'Lệnh Cấm Vận Từ Siêu Cường',
    desc: 'Một siêu cường bất ngờ <span class="hl-bad">áp thuế chống phá giá 50%</span> lên mặt hàng xuất khẩu chủ lực. Các nhà máy dọa <span class="hl-bad">sa thải 500.000 công nhân</span>.',
    advisor: 'minh',
    advisorLine: 'Đây là đòn chí mạng. 40% GDP phụ thuộc vào xuất khẩu. Nếu không xử lý nhanh, chúng ta sẽ có nửa triệu người thất nghiệp xuống đường tháng sau.',
    options: [
      { label: 'A', title: 'Nhượng bộ - Tăng giá nội tệ', desc: 'Ký thỏa thuận nhượng bộ, điều chỉnh tỷ giá theo yêu cầu để gỡ bỏ thuế.', effects: { tuban: 15, tangTruong: -1.5, nongdan: -20, onDinhCT: 10 }, consequence: 'Khủng hoảng trước mắt được giải quyết. Nhưng hàng nông sản trong nước mất tính cạnh tranh, nông dân gánh chịu thiệt hại nặng nề.' },
      { label: 'B', title: 'Trả đũa thương mại - Kiện ra WTO', desc: 'Áp thuế ngược lên hàng hóa của họ. Tìm kiếm thị trường mới và nộp đơn kiện quốc tế.', effects: { danToc: 25, congnhan: -25, tuban: -20, tangTruong: -3 }, consequence: 'Tinh thần tự tôn dân tộc lên cao. Nhưng kinh tế rơi vào suy thoái ngắn hạn, hàng loạt nhà máy đóng cửa, công nhân mất việc.' },
      { label: 'C', title: 'Gói cứu trợ nội địa khổng lồ', desc: 'Không nhượng bộ cũng không trả đũa. Dùng ngân sách thu mua hàng hóa và trợ cấp nhà máy.', effects: { congnhan: 15, tuban: 10, nganSach: -30, tangTruong: -1 }, consequence: 'Bảo vệ được việc làm và giữ được thể diện quốc gia. Nhưng kho bạc cạn kiệt, đẩy quốc gia đến bờ vực khủng hoảng nợ công.' }
    ]
  }
];
