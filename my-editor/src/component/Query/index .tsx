/*
 * @Date: 2024-01-20 09:23:23
 * @Description:
 */
import { FC, useEffect, useState } from "react";

const Query: FC = () => {
  const [data, setData] = useState<unknown>([]);
  useEffect(() => {
    fetch("https://api.github.com")
      .then((res) => {
        res.json().then((data) => {
          setData(data);
        });
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  return <>{data && <div>{JSON.stringify(data)}</div>}</>;
};
export default Query;
