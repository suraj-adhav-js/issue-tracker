import { Skeleton, StatusBedge } from "@/app/components";
import { Button, Card, Flex, Heading, Link } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetailLoadingPage = () => {
  return  (<div>
        <article className="flex flex-col md:flex-row gap-8">
          <Card
            size={{ initial: "3", md: "4" }}
            className="border-0! flex-7/10 px-8 py-10"
          >
            <h1 className="capitalize text-2xl md:text-4xl font-extrabold mb-5 border-b border-gray-300 pb-5">
              <Skeleton/>
            </h1>
             
            <div className="prose max-w-none text-[16px]">
              <Skeleton count={5}/>
            </div>
          </Card>
          <div className="flex-3/10">
            <Card size="3">
              <h3><Skeleton width="5rem"/></h3>
              <div className="mt-7 mb-5 text-[0.9rem] [&>div]:border-b [&>div]:border-gray-300 [&>div]:py-1.5 ">
                <div>
                   <Skeleton/>
                </div>
                <div>
                   <Skeleton/>
                  
                </div>
                <div>
                   <Skeleton/>
                </div>
              </div>
  
              <div className="flex flex-col gap-2">
                 <Skeleton/>
                 <Skeleton/>
              </div>
            </Card>
          </div>
        </article>
      </div>
    );
};

export default IssueDetailLoadingPage;
