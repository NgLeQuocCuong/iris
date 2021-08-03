import { API_CONST } from './APIs';
import fetch from 'cross-fetch';
import { tokenUtil } from './tokenUtil';

const cats =
{
    "data": {
        "root": {
            "children": [
                {
                    "Sách Tiếng Việt": {
                        "children": [
                            {
                                "Sách thiếu nhi ": {
                                    "children": [
                                        {
                                            "Kiến thức - Bách khoa": {
                                                "children": [],
                                                "uid": "f7745930-dc53-4888-bc33-8da89e4f0495"
                                            }
                                        },
                                        {
                                            "Truyện kể cho bé": {
                                                "children": [],
                                                "uid": "7c0e3bf2-9baf-4569-8653-6c7ddff94ea7"
                                            }
                                        },
                                        {
                                            "Truyện tranh thiếu nhi": {
                                                "children": [],
                                                "uid": "136fb11b-1dd1-4db6-b0ea-f7cf63d6feb2"
                                            }
                                        },
                                        {
                                            "Tô màu - Luyện chữ  ": {
                                                "children": [],
                                                "uid": "d5053761-a1b0-4b24-a8d5-64ffec998aa5"
                                            }
                                        },
                                        {
                                            "Văn học thiếu nhi": {
                                                "children": [],
                                                "uid": "456f7559-912e-45f8-a755-0f48fa85bbd2"
                                            }
                                        },
                                        {
                                            "Đạo đức - Kỹ năng sống": {
                                                "children": [],
                                                "uid": "f7078770-30c3-4e2e-b58f-beefd9f95331"
                                            }
                                        },
                                        {
                                            "Truyện tranh Ehon": {
                                                "children": [],
                                                "uid": "e40268b2-0d28-4785-bf80-86638d8138af"
                                            }
                                        },
                                        {
                                            "Truyện cổ tích": {
                                                "children": [],
                                                "uid": "425142cb-836a-49bb-a021-b0ea7f2b225b"
                                            }
                                        }
                                    ],
                                    "uid": "884e95b0-86a2-41fa-8726-49c10f33ae26"
                                }
                            },
                            {
                                "Sách văn học": {
                                    "children": [
                                        {
                                            "Truyện ngắn - Tản văn - Tạp Văn": {
                                                "children": [],
                                                "uid": "d736d4e6-0aec-4f57-afec-367e8db950de"
                                            }
                                        },
                                        {
                                            "Tiểu Thuyết": {
                                                "children": [],
                                                "uid": "4a2cea01-dfac-4862-a961-5a42887a3a88"
                                            }
                                        },
                                        {
                                            "Tác phẩm kinh điển": {
                                                "children": [],
                                                "uid": "05c13fc7-5858-4057-a32c-646d43f0ef75"
                                            }
                                        },
                                        {
                                            "Truyện trinh thám": {
                                                "children": [],
                                                "uid": "c34c913d-0d08-48bf-aabe-a7b37b0f4c0f"
                                            }
                                        },
                                        {
                                            "Light novel": {
                                                "children": [],
                                                "uid": "f7e7ce83-259a-4694-914d-be30b9e7a636"
                                            }
                                        },
                                        {
                                            "Truyện ngôn tình": {
                                                "children": [],
                                                "uid": "5a80be18-3e96-490e-8d8f-4d33bc0033ea"
                                            }
                                        },
                                        {
                                            "Tiểu sử - Hồi ký": {
                                                "children": [],
                                                "uid": "7917286d-f243-4c59-8d22-93eacd580aae"
                                            }
                                        },
                                        {
                                            "Truyện Giả tưởng - Huyền Bí - Phiêu Lưu": {
                                                "children": [],
                                                "uid": "dbd7a296-3976-452c-b90d-8fe48b0150e5"
                                            }
                                        },
                                        {
                                            "Truyện dài": {
                                                "children": [],
                                                "uid": "98b8b84f-4b69-4fe9-a0c5-91a7b6227e6b"
                                            }
                                        },
                                        {
                                            "Phóng sự - Ký sự - Bút ký": {
                                                "children": [],
                                                "uid": "c6c132e3-10fe-4408-ad59-c3990faa42bd"
                                            }
                                        },
                                        {
                                            "Thơ": {
                                                "children": [],
                                                "uid": "6f572823-f489-4c07-9c99-73596da2ec53"
                                            }
                                        },
                                        {
                                            "Phê Bình - Lý Luận Văn Học": {
                                                "children": [],
                                                "uid": "4ef1b179-a697-4690-9e02-4b8c82dc8c3f"
                                            }
                                        },
                                        {
                                            "Tranh Truyện": {
                                                "children": [],
                                                "uid": "e6830185-c2b9-4ba9-a808-92fa25ddede2"
                                            }
                                        },
                                        {
                                            "Truyện kinh dị": {
                                                "children": [],
                                                "uid": "4f9cb7da-ef1b-40f4-8036-4942655db6af"
                                            }
                                        },
                                        {
                                            "Du ký": {
                                                "children": [],
                                                "uid": "48ac695c-4d98-4eb7-8fe0-448623871f54"
                                            }
                                        },
                                        {
                                            "Truyện cổ tích - Ngụ ngôn": {
                                                "children": [],
                                                "uid": "6f166fb1-18be-4603-a1e9-bd04dfe0f3a3"
                                            }
                                        },
                                        {
                                            "Truyện kiếm hiệp": {
                                                "children": [],
                                                "uid": "bed508e8-85e4-4d60-92ec-94b5a195d76e"
                                            }
                                        },
                                        {
                                            "Truyện cười": {
                                                "children": [],
                                                "uid": "f37eb71f-11b5-43f7-99d9-8871a0f17dbc"
                                            }
                                        },
                                        {
                                            "Sách ảnh": {
                                                "children": [],
                                                "uid": "504d6b26-ae62-4f64-90cd-e68ed76a32fb"
                                            }
                                        },
                                        {
                                            "Truyện đam mỹ": {
                                                "children": [],
                                                "uid": "3cc25392-d38f-4577-a173-acfb1ffeb234"
                                            }
                                        },
                                        {
                                            "Ca dao - Tục ngữ": {
                                                "children": [],
                                                "uid": "4780f5e3-f411-4d5a-9dea-cca6439247d1"
                                            }
                                        }
                                    ],
                                    "uid": "f8f3222f-e830-4bb0-94be-3a660d50c579"
                                }
                            },
                            {
                                "Sách kỹ năng sống": {
                                    "children": [
                                        {
                                            "Sách tư duy - Kỹ năng sống": {
                                                "children": [],
                                                "uid": "4724e9cd-a3b3-4e65-83a3-584908f59ff4"
                                            }
                                        },
                                        {
                                            "Sách nghệ thuật sống đẹp": {
                                                "children": [],
                                                "uid": "57037655-21e7-4f86-9c94-30bf7f0e7251"
                                            }
                                        },
                                        {
                                            "Sách hướng nghiệp - Kỹ năng mềm": {
                                                "children": [],
                                                "uid": "535d2133-6696-4eb2-9612-8af7914febd9"
                                            }
                                        }
                                    ],
                                    "uid": "446bcc12-a5fc-430c-9bde-3bd6b41eaf2f"
                                }
                            },
                            {
                                "Sách Tham Khảo": {
                                    "children": [
                                        {
                                            "Sách tham khảo cấp I": {
                                                "children": [],
                                                "uid": "525b9583-8a7d-4950-9683-d702defc9f18"
                                            }
                                        },
                                        {
                                            "Sách tham khảo cấp II": {
                                                "children": [],
                                                "uid": "42d98842-d193-4b43-b6d3-5f43f4d4b082"
                                            }
                                        },
                                        {
                                            "Sách tham khảo cấp III": {
                                                "children": [],
                                                "uid": "72405659-59ba-43aa-b9d9-e809ed8b9933"
                                            }
                                        },
                                        {
                                            "Sách Luyện Thi Đại Học - Cao Đẳng": {
                                                "children": [],
                                                "uid": "974e3d7b-9ca7-45f9-864d-5ca17421ba14"
                                            }
                                        },
                                        {
                                            "Thẻ luyện thi": {
                                                "children": [],
                                                "uid": "000d90bf-2ff6-421c-a9b3-864f5d034ccb"
                                            }
                                        },
                                        {
                                            "Sách chuyên đề": {
                                                "children": [],
                                                "uid": "de43c7cf-5f46-4560-8603-347e21bcbe32"
                                            }
                                        }
                                    ],
                                    "uid": "ecb4821c-3381-4a62-a2dc-0d9ddfc8a24f"
                                }
                            },
                            {
                                "Sách kinh tế": {
                                    "children": [
                                        {
                                            "Sách kỹ năng làm việc": {
                                                "children": [],
                                                "uid": "0e5d212b-fa7e-425a-9358-ab4ca218c44f"
                                            }
                                        },
                                        {
                                            "Bài học kinh doanh": {
                                                "children": [],
                                                "uid": "01aa8544-37b9-403e-89ca-4ff9c432f37d"
                                            }
                                        },
                                        {
                                            "Sách Marketing - Bán hàng ": {
                                                "children": [],
                                                "uid": "ac05ae00-bb55-4c5c-a888-f0b808ee0aea"
                                            }
                                        },
                                        {
                                            "Sách quản trị, lãnh đạo": {
                                                "children": [],
                                                "uid": "92d96fd0-1606-4b3a-93cb-61fba1f9f54f"
                                            }
                                        },
                                        {
                                            "Sách kinh tế học": {
                                                "children": [],
                                                "uid": "d9d1e988-1eb1-46b4-bc57-d66181f078e2"
                                            }
                                        },
                                        {
                                            "Sách doanh nhân": {
                                                "children": [],
                                                "uid": "4ce55a92-cc6f-4ffb-9715-7e9940a19f8c"
                                            }
                                        },
                                        {
                                            "Sách khởi nghiệp": {
                                                "children": [],
                                                "uid": "3d278434-8114-4d19-ae07-799cfee4443c"
                                            }
                                        },
                                        {
                                            "Sách tài chính, tiền tệ": {
                                                "children": [],
                                                "uid": "b5cf3aad-08ff-4c80-bc9c-a0743d905b26"
                                            }
                                        },
                                        {
                                            "Sách tài chính, kế toán": {
                                                "children": [],
                                                "uid": "873538f7-fd6e-46c7-8071-b332fe85bcec"
                                            }
                                        },
                                        {
                                            "Sách quản trị nhân lực": {
                                                "children": [],
                                                "uid": "4508a4aa-7d38-4ddb-b652-1e9f63427f95"
                                            }
                                        }
                                    ],
                                    "uid": "3a43ef1e-2bf3-4f8e-b772-8cac8d4b0322"
                                }
                            },
                            {
                                "Sách Học Ngoại Ngữ": {
                                    "children": [
                                        {
                                            "Sách Học Tiếng Anh": {
                                                "children": [],
                                                "uid": "06cb180c-2b63-4f72-a87b-a1412fa3f16f"
                                            }
                                        },
                                        {
                                            "Sách Học Tiếng Hoa": {
                                                "children": [],
                                                "uid": "6490ad7c-f91a-4e12-952e-254c03842c93"
                                            }
                                        },
                                        {
                                            "Sách Học Tiếng Hàn": {
                                                "children": [],
                                                "uid": "a694d10e-62e2-48f4-9c30-9872cd39061f"
                                            }
                                        },
                                        {
                                            "Sách Học Tiếng Nhật": {
                                                "children": [],
                                                "uid": "c37bedc8-6d31-40c6-8ff6-591391a97675"
                                            }
                                        },
                                        {
                                            "Ngoại Ngữ Khác": {
                                                "children": [],
                                                "uid": "98fab2a6-bc50-4e9f-b20e-cd2c63171cd9"
                                            }
                                        }
                                    ],
                                    "uid": "e3975863-4ce1-4c89-9d13-5504a97570f1"
                                }
                            },
                            {
                                "Sách Kiến Thức Tổng Hợp": {
                                    "children": [
                                        {
                                            "Kiến Thức Bách Khoa": {
                                                "children": [],
                                                "uid": "40bc3383-1e0a-4a2f-a5bb-00638d64f4a3"
                                            }
                                        },
                                        {
                                            "Lĩnh vực khác": {
                                                "children": [],
                                                "uid": "d8809977-8531-4cf3-b8fc-64b55a127996"
                                            }
                                        },
                                        {
                                            "Sách Phong Thủy - Kinh Dịch": {
                                                "children": [],
                                                "uid": "7502f099-ab7a-4c30-b2f8-96ddd46caa8b"
                                            }
                                        },
                                        {
                                            "Triết Học": {
                                                "children": [],
                                                "uid": "cb1ef1a0-f6e7-4501-9702-ea190f37943e"
                                            }
                                        },
                                        {
                                            "Sách giáo dục": {
                                                "children": [],
                                                "uid": "3f949558-dba5-4cb5-8145-ab0cb4f55f7c"
                                            }
                                        },
                                        {
                                            "Sách Chiêm Tinh - Horoscope": {
                                                "children": [],
                                                "uid": "80c99f58-b1fd-4aa6-85c1-7e3e1dbd2d33"
                                            }
                                        }
                                    ],
                                    "uid": "82e2005c-2a6d-43c3-a9d3-300ef925da02"
                                }
                            },
                            {
                                "Truyện Tranh, Manga, Comic": {
                                    "children": [],
                                    "uid": "6a05a485-d116-46a7-b1fb-ea8c790b6cdb"
                                }
                            },
                            {
                                "Sách Bà mẹ - Em bé": {
                                    "children": [
                                        {
                                            "Sách Làm Cha Mẹ": {
                                                "children": [],
                                                "uid": "099e5139-d74e-442f-97a9-261227d237a8"
                                            }
                                        },
                                        {
                                            "Sách Kiến Thức - Kỹ Năng Cho Trẻ": {
                                                "children": [],
                                                "uid": "29d5de72-9344-4358-b407-90e340444235"
                                            }
                                        },
                                        {
                                            "Sách Dinh Dưỡng - Sức Khỏe Cho Bé": {
                                                "children": [],
                                                "uid": "f1da2872-fde4-4035-b725-f96e6d83676f"
                                            }
                                        },
                                        {
                                            "Sách Thai Giáo": {
                                                "children": [],
                                                "uid": "5f8a9fb3-fce9-44b4-9f0e-3d513ef8911b"
                                            }
                                        }
                                    ],
                                    "uid": "80c50b43-d725-44fb-a361-e0727c8b08e2"
                                }
                            },
                            {
                                "Sách Chính Trị - Pháp Lý": {
                                    "children": [],
                                    "uid": "b0d45d07-f85a-4796-bd21-380e6d1c6187"
                                }
                            },
                            {
                                "Sách Y Học": {
                                    "children": [],
                                    "uid": "1d4ce6f6-eaf2-49e5-b294-dba70c14feeb"
                                }
                            },
                            {
                                "Sách Tôn Giáo - Tâm Linh": {
                                    "children": [],
                                    "uid": "e63464f0-7ea1-4de2-a370-146fd9eef432"
                                }
                            },
                            {
                                "Sách Lịch sử": {
                                    "children": [
                                        {
                                            "Lịch Sử Việt Nam": {
                                                "children": [],
                                                "uid": "7c39d964-fa69-4afb-bea1-6909946d26b1"
                                            }
                                        },
                                        {
                                            "Lịch Sử Thế Giới": {
                                                "children": [],
                                                "uid": "79ecba79-c9df-4bca-9fd5-86f14d8e5821"
                                            }
                                        }
                                    ],
                                    "uid": "fe61abcb-4cad-434c-8b37-2ff5aff927ff"
                                }
                            },
                            {
                                "Sách Thường Thức - Gia Đình": {
                                    "children": [
                                        {
                                            "Sách Nấu ăn": {
                                                "children": [],
                                                "uid": "ce53ba5a-a1af-4c8a-ad18-4ec46faac26e"
                                            }
                                        },
                                        {
                                            "Chăm sóc sức khỏe": {
                                                "children": [],
                                                "uid": "b3104370-e6da-4c64-bba3-5d9c3fb7c2f1"
                                            }
                                        },
                                        {
                                            "Sách Làm Đẹp": {
                                                "children": [],
                                                "uid": "c29f6f49-cada-44ca-ae26-fd3dd3319e26"
                                            }
                                        },
                                        {
                                            "May - Thêu - Thời Trang": {
                                                "children": [],
                                                "uid": "d6308049-1b04-4932-96e0-ba8191349a91"
                                            }
                                        }
                                    ],
                                    "uid": "e6350129-dd67-4e4f-b031-d1f5465f12fe"
                                }
                            },
                            {
                                "Sách Khoa Học - Kỹ Thuật": {
                                    "children": [],
                                    "uid": "3f4adcc1-38c3-414f-89b4-954d7e94b8ba"
                                }
                            },
                            {
                                "Sách Văn Hóa - Địa Lý - Du Lịch": {
                                    "children": [
                                        {
                                            "Sách Địa Danh - Du Lịch": {
                                                "children": [],
                                                "uid": "5cfb35d0-3048-4098-8258-97ab1803da73"
                                            }
                                        },
                                        {
                                            "Sách Phong Tục - Tập Quán": {
                                                "children": [],
                                                "uid": "0e115462-276e-4553-8866-123d35b2a77b"
                                            }
                                        },
                                        {
                                            "Sách Danh Nhân": {
                                                "children": [],
                                                "uid": "46d572f9-7e83-485f-bdff-3003b24b6df8"
                                            }
                                        }
                                    ],
                                    "uid": "585fb1d9-fbc2-4afb-b843-d09f43180969"
                                }
                            },
                            {
                                "Từ Điển": {
                                    "children": [
                                        {
                                            "Từ Điển Tiếng Anh": {
                                                "children": [],
                                                "uid": "fd6de773-5c07-4f9a-8518-9ea76dbac06a"
                                            }
                                        },
                                        {
                                            "Từ Điển Tiếng Việt": {
                                                "children": [],
                                                "uid": "77f51ca7-66a3-42cb-b004-c940783746f8"
                                            }
                                        },
                                        {
                                            "Từ Điển Ngôn Ngữ Khác": {
                                                "children": [],
                                                "uid": "ef0f54d5-f5e8-44cc-865b-d0355142f621"
                                            }
                                        },
                                        {
                                            "Từ Điển Tiếng Hàn": {
                                                "children": [],
                                                "uid": "16d139bf-3be0-4a87-8d6d-3e0b2b0aee13"
                                            }
                                        },
                                        {
                                            "Từ Điển Tiếng Trung": {
                                                "children": [],
                                                "uid": "d02568fb-50e1-4227-b79e-0008bd8b8ca8"
                                            }
                                        },
                                        {
                                            "Từ Điển Tiếng Nhật": {
                                                "children": [],
                                                "uid": "095619d3-8167-4ffc-8782-da1b8dce581d"
                                            }
                                        },
                                        {
                                            "Từ Điển Tiếng Pháp": {
                                                "children": [],
                                                "uid": "4a101e1a-6cc5-46d4-a79f-1c78d7dc4de2"
                                            }
                                        }
                                    ],
                                    "uid": "6bf3188c-e11d-43d5-b87d-518ec5c9bffa"
                                }
                            },
                            {
                                "Điện Ảnh - Nhạc - Họa": {
                                    "children": [
                                        {
                                            "Mỹ Thuật - Kiến Trúc": {
                                                "children": [],
                                                "uid": "c77a83a3-b20b-44bc-a1a3-b90db1908ef4"
                                            }
                                        },
                                        {
                                            "Âm Nhạc - Điện Ảnh": {
                                                "children": [],
                                                "uid": "72e30632-ba78-466d-890d-7cb9c4765c26"
                                            }
                                        },
                                        {
                                            "Sách Tô Màu Dành Cho Người Lớn": {
                                                "children": [],
                                                "uid": "0368dee3-bc5e-4fd9-b174-0ae9fd1fc711"
                                            }
                                        }
                                    ],
                                    "uid": "95925afa-cb4a-44d4-9f4f-a36c5d12e25d"
                                }
                            },
                            {
                                "Sách Giáo Khoa - Giáo Trình": {
                                    "children": [
                                        {
                                            "Giáo Trình Đại Học - Cao Đẳng": {
                                                "children": [],
                                                "uid": "23d4da83-706b-4f7a-b41e-a0660c4b6ca8"
                                            }
                                        },
                                        {
                                            "Sách Giáo Khoa Cấp 1": {
                                                "children": [],
                                                "uid": "f858417c-1c49-4dbe-9413-cf258ae35117"
                                            }
                                        },
                                        {
                                            "Sách Giáo Khoa Cấp 3": {
                                                "children": [],
                                                "uid": "e24e1ee2-4995-4080-90d9-7bcb49fb778e"
                                            }
                                        },
                                        {
                                            "Sách Giáo Khoa Cấp 2": {
                                                "children": [],
                                                "uid": "60abbdef-b476-47a1-adcc-f8c654e7cd97"
                                            }
                                        }
                                    ],
                                    "uid": "762683cb-0a50-41fd-8178-45e4d80e6c4f"
                                }
                            },
                            {
                                "Sách Tâm lý - Giới tính": {
                                    "children": [],
                                    "uid": "4415bd19-ba4f-4389-b0e8-6cd33a41736c"
                                }
                            },
                            {
                                "Thể Dục - Thể Thao": {
                                    "children": [],
                                    "uid": "78948e71-ac45-4864-a368-ab76504971b8"
                                }
                            },
                            {
                                "Sách Công Nghệ Thông Tin": {
                                    "children": [
                                        {
                                            "Lập Trình": {
                                                "children": [],
                                                "uid": "6a34aa12-394b-44a1-a7dc-d710762f2bc8"
                                            }
                                        },
                                        {
                                            "Tin Học Văn Phòng": {
                                                "children": [],
                                                "uid": "991e3cd8-578e-4332-a818-4748561ed0bb"
                                            }
                                        },
                                        {
                                            "Thiết Kế - Đồ Họa": {
                                                "children": [],
                                                "uid": "14d3b731-192b-4355-af6e-7647b6724c03"
                                            }
                                        }
                                    ],
                                    "uid": "0d5e5a0a-dbaa-48f2-bfd8-a603e046f50f"
                                }
                            },
                            {
                                "Tạp Chí - Catalogue": {
                                    "children": [],
                                    "uid": "b9529117-236f-4ec4-b08d-0a4e23484bb4"
                                }
                            },
                            {
                                "Sách Nông - Lâm - Ngư Nghiệp": {
                                    "children": [],
                                    "uid": "64302dc6-b359-4ea1-9e89-bad53e95f0f8"
                                }
                            }
                        ],
                        "uid": "1fe94e00-a019-4d3e-8522-2d5a2158f033"
                    }
                }
            ],
            "uid": "050e0b75-03af-490f-be78-5a3fe787fb72"
        }
    },
    "error_code": 0
}
const getCategories = async () => {
    // return [true, cats]
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_CATEGORIES;
    // tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const rate = async data => {
    let response;
    let options = {
        method: 'POST',
        body: data,
    }
    let url = API_CONST.RATE;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        tokenUtil.checkResponseErrorCode(body, 'Thêm đánh giá thành công');
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const bookDetails = {
    uid: 'defautId',
    name: 'Tên sách',
    rate_average: 4,
    rate_count: 1234,
    price: 12400,
    discount: '-12%',
    author: 'Tác giả',
    numpage: 12,
    bookCover: 'Bìa mềm',
    publisher: 'NXB Kim Đồng',
    ctyph: 'Skybooks',
    images: [
        'https://salt.tikicdn.com/cache/w64/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        'https://vcdn.tikicdn.com/cache/w64/ts/review/da/b3/1e/76a4d4ff4788418e60ca9b8054cfbfe9.jpg',
        'https://vcdn.tikicdn.com/cache/w64/ts/review/3b/d9/61/5cfb01575d11ee151f41d56fc7393235.jpg',
        'https://vcdn.tikicdn.com/cache/w64/ts/review/d1/da/ec/31d209a460d90b670fa553a3e4eccb57.jpg',
        'https://vcdn.tikicdn.com/cache/w64/ts/review/78/31/58/5f8e4187132f7c423cc8a0027c7db26d.jpg',
        'https://vcdn.tikicdn.com/cache/w64/ts/review/b7/ae/39/f72d4fce28f260fb083e467a2742f889.jpg']
}
const getBookDetails = async (bookId) => {
    if (API_CONST.TEST_MODE) {
        return [true, { data: bookDetails }]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_BOOK_INFO + `?id=${bookId}`
    // tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const relaPros = [
    {
        image: 'https://salt.tikicdn.com/cache/w64/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID1',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w64/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID2',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w64/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID3',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w64/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID4',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w64/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID5',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
]
const getRelatedProducts = async bookId => {
    if (API_CONST.TEST_MODE) {
        return [true, { data: relaPros }]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_RELATED_BOOK + `?id=${bookId}`;
    // tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}
const des = 'Để hoàn thành nhiệm vụ gìn giữ hòa bình cho hai nước Ostania và Westalis, gia đình Forger đã vượt qua kì thi tuyển đầy thử thách của học viện danh tiếng. Nhưng sau đó Anya phải trở thành học sinh ưu tú của trường để tiếp cận Desmond. Kế hoạch tác chiến “xây dựng tình bạn” của Twilight sẽ được thực hiện thế nào đây…!?<br /><br />TATSUYA ENDO<br /><br />Có một thuyết cho rằng gián điệp là nghề nghiệp cổ xưa thứ 2 trên thế giới. Lừa lọc, đánh bẫy, đó chính là lịch sử dối trá của nhân loại.<br />Ngay cả tôi, ngày nào cũng đưa cho biên tập viên thông tin sai lệch rằng: “Trong hôm nay tôi sẽ nộp bản thảo!” đấy.<br /><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Tuy nhiên tuỳ vào từng loại sản phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, ...</p>'
const getBookDescription = bookId => {
    return des
}
const getRecomendedProducts = async (userID, categoryID) => {
    if (API_CONST.TEST_MODE) {
        return [true, { data: relaPros.slice(0, 4) }]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_RECOMMEND_BOOK + `?uid=${userID}`; //&categoryID=${categoryID}`;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const getCommonProducts = async (filter) => {
    if (API_CONST.TEST_MODE) {
        return [true, { data: relaPros.slice(0, 4) }]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_COMMON_BOOK + (filter || '');
    // tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const getRate = async params => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_RATES + params;
    // tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const getRateOfUser = async bookID => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_RATE_OF_USER + `?uid=${bookID}`;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

export const ProductServices = {
    getCategories,
    getBookDetails,
    getRelatedProducts,
    getRecomendedProducts,
    getCommonProducts,
    getBookDescription,
    getRate,
    getRateOfUser,
    rate,
}