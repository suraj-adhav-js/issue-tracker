"use client";
import { Button, Theme } from "@radix-ui/themes";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPage = Math.ceil(itemCount / pageSize);

  if (totalPage <= 1) return null;

  return (
    <Theme accentColor="gray" asChild>
      <div className="flex justify-end">
        <div className="flex gap-2 items-center">
          <Button variant="outline" disabled={currentPage === 1}>
            <MdOutlineKeyboardDoubleArrowLeft
              size={"20px"}
              className="text-gray-700"
            />
          </Button>
          <Button variant="outline" disabled={currentPage === 1}>
            <MdOutlineKeyboardArrowLeft
              size={"20px"}
              className="text-gray-700"
            />
          </Button>
          <span className="text-gray-700 ">
            Page {currentPage} of {totalPage}{" "}
          </span>
          <Button variant="outline" disabled={currentPage === totalPage}>
            <MdOutlineKeyboardArrowRight
              size={"20px"}
              className="text-gray-700"
            />
          </Button>
          <Button variant="outline" disabled={currentPage === totalPage}>
            <MdOutlineKeyboardDoubleArrowRight
              size={"20px"}
              className="text-gray-700"
            />
          </Button>
        </div>
      </div>
    </Theme>
  );
};

export default Pagination;
