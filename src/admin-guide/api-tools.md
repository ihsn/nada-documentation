# Tools for API users

To facilitate the maintenance of NADA catalogs using the API, a R package (NADAR) and a Python library (PyNADA) have been developed. Both provide a collection of functions that allow catalog administrator to perform many of the catalog maintenance operations via API, often in a more efficient manner than can be done using the administrator interface. Indeed, the programmatic maintenance of a catalog enables the automation and replicability of multiple tasks. The use of the API is therefore highly recommended for organizations that have skills in R and/or Python.

The NADA API is not only intended to support catalog curators, but also the public who will have access to the catalog. If most API functions are only accessible to catalog administrators, others are publicly accessible.

## R package NADAR

The NADAR package must be installed from its GitHub repository. It is currently not available on the CRAN. To install NADAR:

```r
library(devtools)
install_github("mah0001/nadar")
```

Once installed, NADAR functions and their documentation will be available in R, RStudio, or other IDE.

![](~@imageBase/images/image47.png)

## Python library PyNADA

The PyNADA package was developed for Python 3.n. It is available on GitHub (https://github.com/kl9ch/PyNADA) and PyPI (https://pypi.org/project/pynada/). To install PyNADA:

```python
pip install pynada
```

![](~@imageBase/images/image48.png)

You can also install the latest development version directly from the github repository with:
```python
pip install git+https://github.com//kl9ch/PyNADA
```
or by cloning from the github repository then installing:
```python
git clone https://github.com//kl9ch/PyNADA
cd PyNADA
pip install PyNADA
```

To install from github using the above methods, git needs to be installed on your computer and included in your PATH environment variable. Instructions on how to install git are provided here: https://github.com/git-guides/install-git [Catalog administration](/admin-guide/web-ui/)
