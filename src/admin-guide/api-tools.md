# Tools for API users

To facilitate the maintenance of NADA catalogs using the API, a R
package (NADAR) and a Python library (PyNADA) have been developed. Both
provide a collection of functions that allow catalog administrator to
perform many of the catalog maintenance operations via API, often in a
more efficient manner than can be done using the administrator
interface. Indeed, the programmatic maintenance of a catalog enables the
automation and replicability of multiple tasks. The use of the API is
therefore highly recommended for organizations that have skills in R
and/or Python.

The NADA API is not only intended to support catalog curators, but also
the public who will have access to the catalog. If most API functions
are only accessible to catalog administrators, others are publicly
accessible.

## R package NADAR

The NADAR package is available on GitHub (repo address). It is not at
this stage available on the CRAN.

To install NADAR:

library(devtools)

install_github(\"mah0001/nadar\")

![](~@imageBase/images/image47.png)

## Python Library PyNADA

The PyNADA package was developed for Python 3.n. It is available on
GitHub (https://github.com/kl9ch/PyNADA) and PyPI
(https://pypi.org/project/pynada/).

To install PyNADA:

pip install pynada

![](~@imageBase/images/image48.png)

**Installing from source**

-   You can install the latest development version directly from the
    github repository with:

> pip install git+https://github.com//kl9ch/PyNADA

-   Or cloning from the github repository then installing:

> git clone https://github.com//kl9ch/PyNADA
>
> cd PyNADA
>
> pip install PyNADA

To install from github using the above methods, git needs to be
installed on your computer and included in your PATH environment
variable. Instructions on how to install git are provided here:
https://github.com/git-guides/install-git.[Catalog
administration](https://mah0001.github.io/test-docs/admin-guide/web-ui/)