type Props = {
  before: string;
  after: string;
};

export default function BeforeAfter({ before, after }: Props) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <p>Before</p>
        <img src={before} alt="before" />
      </div>

      <div>
        <p>After</p>
        <img src={after} alt="after" />
      </div>
    </div>
  );
}
