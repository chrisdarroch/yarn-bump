Helps change the version of a workspace package everywhere it is used.

## What's it for?

Let's say you have a set of packages in a Yarn workspace
with inter-dependencies amongst them. You want to update
the version of one package and also update its version
in any other packages that depend upon it, all at once.

This utility will help you bump the version everywhere it
needs to, so that your Yarn workspace keeps working
as you'd expect it to.

### But why?

Yarn's workspaces feature requires that package versions are
an exact match when specified as a dependency. If they are not,
the dependency is "mismatched", and Yarn will go to the network
to find a published version.

Maybe you're experimenting with your code and don't want to
publish your packages just yet.

Maybe you have private packages which you have no intent to
publish, but you still want to manage them in a workspace.

This utility will help you in those scenarios.

### How is this different to other tools?

Tools like [Bolt] and [Lerna] are amazing multi-package management
solutions. They will allow you to manage inter-related dependencies
as well as intelligently publish them as needed.

Both [Bolt], [Lerna], and this utility allow you to bump a package's
version and also update its usage across your workspace. This is
where their similarities end.

This utility only bumps package versions. It has no additional
logic for publishing packages, nor tagging and pushing things in your
version control system.

If you just want to bump package versions
without all of the clever publishing logic that tools
like [Bolt] and [Lerna] provide, this utility is for you.

## Usage

* Clone the repository somewhere locally.
* Run the binary, providing its required parameters.

### CLI arguments

```
Options:
  --help             Show help
  --package          package name to bump the version of
  --dir              yarn workspace directory where the package can be found
  -v, --new-version  complete version to give the package
```

## Todo

* Tests 😅
* Make the binary work from the directory it is executed in.
    * infer package name from current working directory.
    * remove `--dir` flag; infer root of workspace from cwd.
* Only update exact version matches (leave semver alone).
