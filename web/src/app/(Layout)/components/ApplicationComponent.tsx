type ApplicationComponentProps = {
  category: string;
};

export default function ApplicationComponent({
  category,
}: ApplicationComponentProps) {
  if (category === "counseling") {
    return <div></div>;
  }
  if (category === "application-form") {
    return <div></div>;
  }
  return <div>{category}</div>;
}
