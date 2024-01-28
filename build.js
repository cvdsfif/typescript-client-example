const esbuild = require("esbuild");

esbuild.buildSync({
    define: {
        "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development"
        ),
    },
    entryPoints: ["src/dev.tsx"],
    bundle: true,
    minify: true,
    treeShaking: true,
    sourcemap: true,
    outfile: "public/script.js"
});