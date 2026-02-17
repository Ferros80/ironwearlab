const fs = require("fs");
const path = "src/components/Navbar.tsx";
let content = fs.readFileSync(path, "utf8");
const oldBlock = content.match(
  /<Link href="\/" className="flex items-center[^>]*>[\s\S]*?<path d="[^"]*" \/>[\s\S]*?<\/svg>/
);
if (oldBlock) {
  const replacement = `<Link href="/" className="flex items-center no-underline min-h-[44px] min-w-[44px]" aria-label="Home">
            <Logo className="block h-10 w-auto object-contain md:h-[183px] md:translate-y-[0.3cm]" />
          </Link>`;
  content = content.replace(oldBlock[0], replacement);
  fs.writeFileSync(path, content);
  console.log("Replaced successfully");
} else {
  console.log("Pattern not found");
}
